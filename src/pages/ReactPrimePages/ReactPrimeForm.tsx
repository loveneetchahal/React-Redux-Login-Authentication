import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils'; 
import { Services } from './Services';
import styles from './FinalForm.module.css'
import Left_nav from '../../components/layout/Left-nav/Left_nav';

const ReactPrimeForm =()=>{
    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const countryservice = new Services();

    useEffect(() => {
        countryservice.getCountries().then(data => setCountries(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const validate = (data:any) => {
        let errors = {name: '',email:'',password:'',accept:''};
        if (!data.name) {
            errors.name = 'Name is required.';
        }

        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        if (!data.accept) {
            errors.accept = 'You need to agree to the terms and conditions.';
        }

        return errors;
    };

    const onSubmit = (data:any, form:any) => {
        debugger;
        setFormData(data);
        setShowMessage(true);
        form.restart();
    };

    const isFormFieldValid = (meta:any) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta:any) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Suggestions</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );  
    return (
        <div className="holder">        
        <Left_nav/>
            <div className="page-container">            
                <div className={styles.form_demo}>
                    <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                            <h5>Registration Successful!</h5>
                            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                Your account is registered under name 
                            </p>
                        </div>
                    </Dialog>

                    <div className="p-d-flex p-jc-center">
                        <div className={styles.card}>
                            <h5 className="p-text-center">Register</h5>
                            <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', password: '', date: null, country: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} className="p-fluid">
                                    <Field name="name" render={({ input, meta }) => (
                                        <div className="p-field">
                                            <span className="p-float-label">
                                                <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Name*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="email" render={({ input, meta }) => (
                                        <div className={styles.p_field}>
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-envelope" />
                                                <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="password" render={({ input, meta }) => (
                                        <div className={styles.p_field}>
                                            <span className="p-float-label">
                                                <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                    <Field name="date" render={({ input }) => (
                                        <div className={styles.p_field}>
                                            <span className="p-float-label">
                                                <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                                <label htmlFor="date">Birthday</label>
                                            </span>
                                        </div>
                                    )} />
                                    <Field name="country" render={({ input }) => (
                                        <div className={styles.p_field}>
                                            <span className="p-float-label">
                                                <Dropdown id="country" {...input} options={countries} optionLabel="name" />
                                                <label htmlFor="country">Country</label>
                                            </span>
                                        </div>
                                    )} />
                                    <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                        <div className="p-field-checkbox">
                                            <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>I agree to the terms and conditions*</label>
                                        </div>
                                    )} />

                                    <Button type="submit" label="Submit" className="p-mt-2" />
                                </form>
                            )} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReactPrimeForm;