import React from 'react'
import { useParams } from 'react-router-dom'
import 'scss/_productsList.scss'
import MainComponents from './MainComponents'


export default function Index({ padding }) {
    const { category, more_category } = useParams()
    // ye upar hum ny useParams k sath 2no categories get kar li hn is page mein kxh khas ni ho raha just hum ny useParms sy category 
    // get kar k agy props ki help sy MainComponents ko pass ki hn MainComponent wo component hai jis main filters or product list show ho gi 
    return (
        <div className="bg-light">
            <div className={`container ${padding}`} id='products-list'>
                <div className="row pt-3">
                    <div className="col">
                        <h5 className='fw-bold'>Category</h5>
                        <h6 className='text-success'>{category}</h6>
                        <h6 className='text-success'>{more_category}</h6>
                    </div>
                </div><hr />

                <MainComponents category={category} more_category={more_category} />
            </div>
        </div>
    )
}
