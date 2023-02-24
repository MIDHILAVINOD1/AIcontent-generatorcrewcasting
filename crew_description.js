import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import {Form, Button, Input, Select} from "antd";
import Container from 'react-bootstrap/Container'
import Header from './header';

const configuration = new Configuration({
  //apikey
});
const openai = new OpenAIApi(configuration);

function Crewdescription() {

  const [result, setResult] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (values) => {
    console.log(values)

    let value = `Generate a unique plagiarism free profile content in one paragraph 100 words for name: ${values.name},Profession: ${values.Profession},Movies Acted on: ${values.movies_acted_on},Languages Speak: ${values.languages_speaks},Industry: ${values.industry},Awards and Achievements: ${values.awards_and_achievements}`;
    setButtonLoading(true);
  try{
      const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: value,
      temperature: 1,
      max_tokens: 800,
      top_p: 1.0,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    if(response)
    {
      setResult(response.data?.choices[0].text);
      setButtonLoading(false);
    }else{
      setButtonLoading(false);
      console.log("data not fetch")
      setErrorMessage("something went wrong!try again after sometime")
    }
 }
   catch(err){
      setButtonLoading(false);
      console.log(err)
      setErrorMessage("something went wrong!try again after sometime")
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 4000);

  };

  return (
    <Container fluid>
    <div class="movie-bank-home">
    <Header/>
    <Form autoComplete="off"
    onFinish={handleSubmit}
     labelCol={{ span: 10}} 
     wrapperCol={{ span: 14}}
     className="mb-form"
     >
        <Form.Item
        name="name" 
        label="Name"

        rules={[
          {
            required: true,
            message: "enter your name",
          },
          { whitespace: true },
          { min: 3},
        ]}
        hasFeedback
        >
         <Input placeholder="Type your name" />
       </Form.Item>

       <Form.Item
        name="profession" 
        label="Profession"
       
        rules={[
          {
            required: true,
            message: "enter your profession",
          },
        ]}
        hasFeedback
        >
         <Input placeholder="Type your profession" />
       </Form.Item>

        <Form.Item
        name="movies_acted_on" 
        label="Movies Acted On"
       
        rules={[
          {
            required: true,
            message: "enter your movies",
          },
        ]}
        hasFeedback
        >
        <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Tags Movies"
       />
      </Form.Item>

      <Form.Item
        name="languages_speaks" 
        label="Languages Speaks"
        rules={[
          {
            required: true,
            message: "select your language",
          },
        ]}
        hasFeedback
        >
        <Select
        style={{ width: '100%' }}
        placeholder="Languages"
        options={[
          {
            options: [
              { label: 'Malayalam',value:'malayalam' },
              { label: 'English',value:'english' },
              { label: 'Hindi',value:'hindi' },
              { label: 'Kannada',value:'kannada' },
            ],
          },
        ]}
       />
        </Form.Item>

        <Form.Item
        name="industry" 
        label="Industry"
        
        rules={[
          {
            required: true,
            message: "enter your industry",
          },
        ]}
        hasFeedback
        >
         <Input placeholder="Type your industry" />
       </Form.Item>

       <Form.Item
        name="awards_and_achievements" 
        label="Awards and Achievements"
        rules={[
          {
            required: true,
            message: "enter your awards and achievements",
          },
        ]}
        hasFeedback
        >
        <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Tags Awards and achievements"
       />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
         <Button loading={buttonLoading} type="primary" htmlType="submit">
           Generate description
         </Button>
     </Form.Item>

      {errorMessage  ? <span style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</span> : null}
      {result ? 
      <Form.Item label="Description">
        <p>{result}</p>
      </Form.Item> :
      null }
  </Form>
  </div>
    </Container>
    
  );
        }


export default Crewdescription;
