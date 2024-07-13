import React, { useState } from "react";
import style from '../styles/footer.scss';
import { useDispatch, useSelector } from "react-redux";
import { subscribeEmail } from '../actions/subscribe';
import { useHistory } from 'react-router-dom';
import ArrowRightIcon from "./icons/ArrowRight";
import FormControl from './opportunity_standard/FormControl';
import Button from './opportunity_standard/Button';
import Input from './opportunity_standard/Input';
import { focusOnAlertFields } from "../utils/accessibility";

const NewsletterSignUp = ({ hasTransparentBackground }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('')

  const [formErrors, setFormErrors] = useState({});

  const validateEmail = () => {
    const errorsObject = {};
    if (!email) {
      errorsObject.email = 'Email is required';
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errorsObject.email = 'Invalid email address';
    }
    
    setFormErrors(errorsObject);
    focusOnAlertFields();
    return Object.keys(errorsObject).length === 0;
  };

  const navigateToSubscribePage = (event) => {
    event.preventDefault()
    if (validateEmail()) {
      dispatch(subscribeEmail({ email }))
      const languageCode = window.location.pathname.split('/')[1]
      history.push({
        pathname: `/${languageCode}/subscribe`,
      })
    }
  }

  return (
    <form className={`${style.subscribeForm} ${style.hasBottomMargin} ${hasTransparentBackground ? style.hasTransparentBackground : ''}`} onSubmit={navigateToSubscribePage}>
      <div>
        <h2>Get Updates</h2>
        <p>Enter your email to receive updates about the Workforce Data Portal.</p>

        <FormControl error={formErrors.email}>
          <div className={style.buttonFieldContainer}>
            <Input placeholder="Enter email address" type="email" value={email} onChange={e => setEmail(e.target.value)} hasRadius={true} />
            <Button type="submit" label="Submit" theme="dark" iconRight={<ArrowRightIcon size={16} />} />
          </div>
        </FormControl>
      </div>
    </form>
  );
};
  
  export default NewsletterSignUp;