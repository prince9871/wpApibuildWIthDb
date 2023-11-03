import './App.css'
import { useEffect, useState } from 'react'
function App () {
  useEffect(() => {
    return () => {}
  }, [])

  const [number, setNumbe] = useState('7976892266')
  const [text, setText] = useState('text')
  const [message, setMessage] = useState('hey there')
  const [instance_id, setInstance_id] = useState('6540EB2046EC3')
  const [access_token, setAccess_token] = useState('6540eab67acc4')

  const [name, setName] = useState('')
  const [productName, setProductName] = useState('')
  const [productCode, setProductCode] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [response, setResponse] = useState('')



let apiData=
  {
    "number": "{int}",//mobile
    "type": "text", // message type format
    "message": "{string}", //this is the message what we have to send
    "instance_id": "609ACF283XXXX", //it will change
    "access_token": "6540eab67acc4" //must Needed it will be same
    }

 const dateGEttingFnciton = async () => {

  console.log('coming inside ')
    let result = await fetch(
      // `https://ai.botcontrolpanel.com/api/send?number=${number}&type=${text}&message=${message}&instance_id=${instance_id}&access_token=${access_token}`,
      'https://ai.botcontrolpanel.com/api/send?number=7979892266&type=text&message=hey there is your response&instance_id=6540EB2046EC3&access_token=6540eab67acc4',
      {
        method: 'get',
        headers: {
          'Content-type': 'application/json'
        }
      }
    )

    // iska response get krwa ek bar fir data connectivity me me
    if (result.ok) {
      result = await result.json()
      console.log('coming data done ')
      console.log(result)
      // setDb(result)
    } else {
      console.log('error in data fetching ')
    }
  }

  const fetchingData = async () => {
    console.log(name)
    console.log('getting all data from backend')
    let result = await fetch(`http://192.168.1.21:3001/dataGet?name=${name}`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      }
    })
    if (result.ok) {
      result = await result.json()
      console.log('getting data is ok')
      console.log('is here', result.data.quantity)
      let quantity = result.data.quantity
      setResponse(name + "'s Quantity is : " + quantity)
    } else {
      console.log('Error in getting data')
      console.log('not ok')
    }
  }

  const createData = async () => {
    console.log('entering createData function')

    try {
      const postData = {
        name: productName,
        code: productCode,
        quantity: productQuantity
      }

      let result = await fetch(`http://192.168.1.21:3001/dataCreate`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      if (result.ok) {
        const responseData = await result.json()
        console.log('Data created successfully')
        console.log('Created data:', responseData.message)
        setResponse(responseData.message)

        // Handle the response data as needed
      } else {
        console.log('Error in creating data')
        console.log('not ok')
        // Handle the error response as needed
      }
    } catch (error) {
      console.error('Error occurred while creating data:', error)
      // Handle the error appropriately
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 style={{ color: 'green' }}>Ai ChatBot WhatsApp</h1>
        <div>
          <h3>Enter Your Entries Here</h3>

          <input
            type='text'
            name=''
            id='inputBox'
            placeholder='enter productName to create'
            value={productName}
            onChange={event => {
              setProductName(event.target.value)
            }}
          />
          <input
            type='text'
            name=''
            placeholder='enter productCode to create'
            id='inputBox'
            value={productCode}
            onChange={event => {
              setProductCode(event.target.value)
            }}
          />
          <input
            type='text'
            name=''
            id='inputBox'
            placeholder='enter productQuantity to create'
            value={productQuantity}
            onChange={event => {
              setProductQuantity(event.target.value)
            }}
          />
          <button onClick={createData}>Create Data</button>
        </div>
        <h3>Enter Product Name Here</h3>

        <input
          type='text'
          name=''
          id='inputBox'
          placeholder='enter productName to fetch it'
          value={name}
          onChange={event => {
            setName(event.target.value)
          }}
        />
        {/* <button onClick={dateGEttingFnciton}>Send</button> */}
        <button 
        // onClick={fetchingData}
        onClick={dateGEttingFnciton}
        >Fetch Data</button>
        <h1 style={{ color: 'grey' }}>Get Reponses are here</h1>

        <p>{response}</p>
      </header>
    </div>
  )
}

export default App
