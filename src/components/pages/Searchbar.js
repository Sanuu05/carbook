import React from 'react'
import axios from 'axios'
import { port } from '../../action/user'
function Searchbar({setalladd,setsstatus,select,alladd,sstatus,setselect}) {
    const search1 = async (v) => {
        try {
            setselect('')
            setsstatus(v)
            const { data } = await axios.get(`${port}/main/search/${v}`)
            setalladd(data)
        } catch (error) {

        }


    }
    const callb = (cb, t) => {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                cb(...args)
            }, t)
        }
    }

    const search = callb(search1, 1000)
  return (
    <div>
        <div style={{ position: 'relative' }}>
                        <input placeholder='Location' value={select?.address} type='text' className='sinput' onChange={(e) => search(e.target.value)} />
                        {
                            alladd && sstatus ?
                                <div className='suggest' >
                                    {
                                        alladd?.map((v, i) => {
                                            return <p onClick={() => {
                                                setselect(v)
                                                setsstatus('')
                                            }}>{v?.display_name}</p>
                                        })
                                    }

                                </div>
                                : null
                        }
                    </div>
    </div>
  )
}

export default Searchbar