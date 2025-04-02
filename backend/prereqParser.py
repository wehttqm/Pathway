### prereqParser.py


class State:
    def __init__(self, fsm):
        self.fsm = fsm

    def handle_input(self, input_data):
        raise NotImplementedError


class FSM:
    context_token = ""
    joiner = ""

    def __init__(self):
        self.q0 = Q0(self)
        self.q2 = Q2(self)
        self.current_state = self.q0
        self.prereqs = {"and": [], "or": []}

    def transition_to(self, new_state):
        self.current_state = new_state

    def handle_input(self, input_data):
        return self.current_state.handle_input(input_data)


def handle_append(fsm, joiner):
    if joiner == "and":
        fsm.joiner = "and"
        fsm.prereqs["and"].append(fsm.context_token)
        # later worry about the case when context_token is a dict
        fsm.transition_to(fsm.q0)
    elif joiner == "or":
        fsm.joiner = "or"
        fsm.prereqs["or"].append(fsm.context_token)
        # later worry about the case when context_token is a dict
        fsm.transition_to(fsm.q0)
    elif joiner == "]" or joiner == ")":
        return "END"
    else:
        raise Exception('could not find an "and" or "or" when transitioning out of q2.')


# Example States


class Q0(State):
    def __init__(self, fsm):
        super().__init__(fsm)

    def handle_input(self, input_data):
        input_token = input_data.pop(0)
        if input_token == "(" or input_token == "[":
            # recursion
            self.fsm.context_token, input_data = hunt_for_prereqs(input_data)
        else:
            # Assume we have a valid course code for now. Later, check with regex
            self.fsm.context_token = input_token

        self.fsm.transition_to(self.fsm.q2)
        return None, input_data


class Q2(State):
    def __init__(self, fsm):
        super().__init__(fsm)

    def handle_input(self, input_data):
        joiner = input_data.pop(0)
        return handle_append(self.fsm, joiner), input_data


def hunt_for_prereqs(input_data: list[str]):
    fsm = FSM()
    while len(input_data) > 0:
        res, input_data = fsm.handle_input(input_data)
        if res is not None:
            break

    handle_append(fsm, fsm.joiner)

    return fsm.prereqs, input_data


if __name__ == "__main__":
    tokens_basic = ["CSC376H5"]

    prereqs = hunt_for_prereqs(tokens_basic)

    print(prereqs[0])
