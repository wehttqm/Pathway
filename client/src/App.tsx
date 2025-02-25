import { Setup } from "./components/setup"
import { Title } from "./components/title"


function App() {
    document.body.classList.add("light")
    return (
        <div className='h-screen p-4 flex flex-row'>
            <div className='flex w-[55%]'>
                <Title/>
            </div>
            <div className='flex w-[45%]'>
                <Setup/>
            </div>
        </div>
    )
}

export default App
