import React, { useState, useEffect } from 'react'
import { makeRequest } from "../Service/requestCall";

export default function List() {

    const [isDataLoaded, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [isSubDataLoaded, setSubLoader] = useState(false);
    const [subdata, setSubData] = useState([]);
    const [searchValue, updateSearchValue] = useState('');

    useEffect(() => {
        try {
            async function getData() {
                let response = await makeRequest({
                    method: "GET",
                    url: "/v1/getWebLink",
                });
                setData(response.data.result);
                setLoader(true);
            }
            getData();
        } catch (error) {
        }
    }, []);

    async function getDetails(url) {
        let response = await makeRequest({
            method: "POST",
            url: "/v1/findTechnologies",
            data :{
                "url" : url
            }
        });
        console.log('res: ',response.data.result.technologies )
        setSubData(response.data.result.technologies);
        setSubLoader(true)

    } async function search(text) {
        updateSearchValue(text);
        let response = await makeRequest({
            method: "POST",
            url: "/v1/searchTech",
            data : {
                searchValue : text
            }
        });
        if(response.data.code == 200){
            let resu = response.data.result.map(function (e) {
                return e.url;
            })
            setData(resu);
            setLoader(true);
            setSubData([]);
        } else {
            setData([]);
            setLoader(true);
            setSubData([]);
        }
        
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        search(event.target.value);
      };

      function SearchInput() {
          return  <div className='input'>
          <input type='text'
          className='form-input'
          placeholder = 'Search here..'
          value = {searchValue}
          autoFocus = {true}
          onChange={handleChange} 
          />
      </div>
      }

    function SubList(data) {
        return (
            <div className="flex-container">
            <h3>Technologies Used</h3>

                <ul className="row width-100 space-evenly margin-8">
                    {data.data.map((value) => {
                        return <li  key={value.name}> {value.name} </li>;
                    })}
                </ul>
            </div>
        );
    }
    function ListDesign({ data }) {
        return (
            <div className="flex-container">
               <SearchInput/>
                <ul className="row width-100 space-evenly margin-8">
                    {data.map((value) => {
                        return <li onClick={() => getDetails(value)} 
                        item={value} key={value.productId}> {value} </li>;
                    })}
                </ul>
                {
                    (subdata && subdata.length) ? <SubList data={subdata}/> : <div/>
                }
            </div>
        );
    }
    function NoDataFound() {
        return <div className='column align-center space-evenly height-30-vh black width-100'>
        <SearchInput/>

            <h1>No Data Available to Show</h1>
            <div className='row'>
                <h2>Try Adding a Item from S3</h2>
            </div>
        </div>
    }
    if (isDataLoaded) {
        if (data.length !== 0) {
            return <ListDesign data={data} />;
        } else {
            return <NoDataFound />
        }
    } else {
        return <div>Loading..</div>;
    }
}
