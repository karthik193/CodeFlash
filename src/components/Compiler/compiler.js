import React, { Component } from 'react'
import "./Compiler.css";

class Compiler extends Component {
    
    constructor(props) {
      super(props)
    
      this.state = {
         code:"",
         input:"",
         output:"",
         lang:2,
      };
    }

    user_code=(event)=>{
      event.preventDefault();
      this.setState({code:event.target.value});
    }
    
    user_input=(event)=>{
      event.preventDefault();
      this.setState({input:event.target.value});
    }

    user_lang=(event)=>{
      event.preventDefault();
      this.setState({lang:event.target.value});
    }
    
    get_output=async(event)=>{
      event.preventDefault();
      let op=document.getElementById('output');
      op.innerHTML="";
      console.log("Submission created");
      //Sending a post request to the api along with all req parameters
      const response=await fetch(
        "https://judge0-extra-ce.p.rapidapi.com/submissions",
        {
          method:"POST",
          headers:{
            "content-type": "application/json",
            accept:"application/json",
          	"x-rapidapi-key": "5c3346ba24mshc95a6692864c468p121751jsn16e1a102fa7f",
	          "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
	          "useQueryString": true
          },
          body: JSON.stringify({
            source_code : this.state.code,
            stdin : this.state.input,
            language_id:this.state.lang,
          }),
        }
      );
      console.log("The result obtained is")
      console.log(response)
      //into json format
      const jsonResponse=await response.json();
      console.log("json")
      console.log(jsonResponse)
      
      let jsonGetOutput={
        status : { description : "Queue" },
        stderr : null,
        compile_output:null,
      };
      while( jsonGetOutput.status.description!=="Accepted" && jsonGetOutput.stderr==null && jsonGetOutput.compile_output==null){
        //checking for any errors
        //op.innerHTML=`Data Sent ...\nCreating Submission...\n Submission Created...\n Checking submission status\n status : ${jsonGetOutput.status.description}\n`;
        //to print each line
        if(jsonResponse.token){
          let url= `https://judge0-extra-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

          //Retrieving the data using get request
          const finalAns=await fetch(url,{
            method : "GET",
            headers : {
              "content-type": "application/json",
              accept:"application/json",
              "x-rapidapi-key": "5c3346ba24mshc95a6692864c468p121751jsn16e1a102fa7f",
              "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
              "useQueryString": true
            },
          });
          //Waiting until we recieve the output 
          jsonGetOutput=await finalAns.json();
        }
      }
      //for the output
      if(jsonGetOutput.stdout){
        const output_rec=atob(jsonGetOutput.stdout);
        //clear output area for the req output
        op.innerHtml=" ";
        op.innerHTML+= `\n Output : ${output_rec}\n Execution Time : ${jsonGetOutput.time} secs\n Memory used : ${jsonGetOutput.memory}`
      }
      //for errors
      else if (jsonGetOutput.stderr) {
        const error = atob(jsonGetOutput.stderr);

        op.innerHTML = "";

        op.innerHTML += `\n Error :${error}`;
      }
      else {
        const compilation_error = atob(jsonGetOutput.compile_output);

        op.innerHTML = "";

        op.innerHTML += `\n Error :${compilation_error}`;
      }
    };
    
    render(){
      return (
          <div>
            //UI code goes here
            
            <select
              value={this.state.lang}
              onChange={this.user_lang}
              id="lang"
              className="form-control form-inline mb-2 language">
              <option value="2">C++</option>
              <option value="1">C</option>
              <option value="4">Java</option>
              <option value="10">Python</option> 
            </select>
            <br/>
            <br/>
            <input required type="textarea" onChange={this.user_code} id='code'></input>
            <p id='output'></p>
            <br/>
            <button type='submit' onClick={this.get_output}>RUN</button>
          </div>
        )
    }    
}
export default Compiler
