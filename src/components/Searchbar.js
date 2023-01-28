import React from 'react'
import axios from 'axios'
function Searchbar({setalladd,setsstatus,select,alladd,sstatus,setselect}) {
    const port = "https://carbook.onrender.com"
    const search1 = async (v) => {
        try {
            setselect('')
            setsstatus(v)
            const { data } = await axios.get(`${port}/main/search/${v}`)
            setalladd(data?.copResults)
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
                                                setselect({ address: v?.formattedAddress, city: v?.city })
                                                setsstatus('')
                                            }}>{v?.formattedAddress}</p>
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