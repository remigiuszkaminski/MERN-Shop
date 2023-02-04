import AddItemForm from './AddItemForm';



export default function Admin() {

    return(
        <div className="mx-52">
            <p className='text-4xl text-center mb-6'>Panel Admina</p>
            <div className='text-center'>
                <AddItemForm />
            </div>
        </div>
    )
}