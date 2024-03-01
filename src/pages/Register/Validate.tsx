import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable, DataTableRowEditParams } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber, InputNumberValueChangeParams } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import styles from '../PrimeNgCrud/DataTable.module.css';
import Left_nav from '../../components/layout/Left-nav/Left_nav';
import { ProductService } from '../PrimeNgCrud/ProductService';

const style = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
  input: {
    width: "100%",
  },
  span:{
      color: "red",
  }
};
const Validate = () =>{
    const classes = useStyles();
    const [items, setCountries] = useState<any>([]);
    const [selectedCountry2, setSelectedCountry2] = useState<any>(null);
    const ToastRef = useRef<Toast>(null);
    const [filteredCountries, setFilteredCountries] = useState<any>(null);
    const productService = new ProductService();
    
    useEffect(() => {   
        productService.getProducts().then(data => setCountries(data)); 
        //console.log(countries[2]);
    }, []); 
  
    const searchCountry = (event: { query: string }) => {
      setTimeout(() => {
          let _filteredCountries;
          if (!event.query.trim().length) {
              _filteredCountries = [...items];
              //console.log(_filteredCountries);
          }
          else {            
            _filteredCountries = items.filter((item:any) => {
              return item.name.toLowerCase().startsWith(event.query.toLowerCase());
          });
           
          }

          setFilteredCountries(_filteredCountries);
      }, 250);
  }
  return(      
    <div className="holder">
      <Left_nav/>
        <div className="page-container">
          <div style={style.container}>
            <div className={styles.datatable_crud_demo}>
              <Toast ref={ToastRef}></Toast>
              <div className="card toast-demo">
              <div className="p-field"><br/><br/><br/>
                    <label htmlFor="name">Name</label>
                    <InputText id="name" required/>
                </div>
                <div className="p-field">
                    <label htmlFor="email">email</label>
                    <InputText id="email"  required />
                </div>
                <div className="p-field">
                <label htmlFor="email">search Item</label>
                <AutoComplete value={selectedCountry2} suggestions={filteredCountries} completeMethod={searchCountry} field="name" dropdown forceSelection  onChange={(e) => setSelectedCountry2(e.value)} />
                </div>  
              </div>
            </div>
        </div>
      </div>
    </div>
     );
};
export default Validate;
function useStyles() {
  //throw new Error("Function not implemented.");
}

