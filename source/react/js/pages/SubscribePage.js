import React, { useState } from "react";
import page from '../hocs/page';
import { useDispatch, useSelector } from "react-redux";
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { industries } from "../utils/industries";
import { subscribe } from '../actions/subscribe';
import style from '../styles/footer.scss';
import AlertBox from '../components/opportunity_standard/AlertBox';
import RadioSelect from "../components/opportunity_standard/RadioSelect";
import { focusOnAlertFields } from "../utils/accessibility";
import FormControl from "../components/opportunity_standard/FormControl";
import Button from "../components/opportunity_standard/Button";
import Input from "../components/opportunity_standard/Input";

const SubscribePage = () => {
    const dispatch = useDispatch();
    const intl = useSelector((state) => state.intl)
    const subscribeState = useSelector((state) => state.subscribe)
    const { errors, isFetching, mailChimpStg } = subscribeState

    const [email, setEmail] = useState(subscribeState.email)
    const [industry, setIndustry] = useState('')
    const [organization, setOrganization] = useState('')
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errorsObject = {};
        if (!organization) {
          errorsObject.organization = 'Organization name field is required';
        }
        if (!email) {
          errorsObject.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
          errorsObject.email = 'Invalid email address';
        }
        if (!industry) {
          errorsObject.industry = 'Industry field is required';
        }
        setFormErrors(errorsObject);
        focusOnAlertFields();
        return Object.keys(errorsObject).length === 0;
    }

    const submitMailchimp = (e) => {
        e.preventDefault();

        if (validateForm()) {
            if (industries.includes(industry)) {
                dispatch(subscribe({email, organization, industry, otherIndustry: '' })) // Picked industry from list
            } else {
                dispatch(subscribe({email, organization, industry: 'Other', otherIndustry: industry})) // Entered custom industry
            }

            window.scrollBy({ top: 200, left: 0, behavior: 'smooth' }) // Scroll the success/failure alert into view
        }
    }
    
    return (
        <div className={style.subscribe}>
            <div className={style.subscribeForm}>
                <h2>Get Updates</h2>

                <div className={style.modal}>
                    <form className={style.subscribeFormInner} onSubmit={submitMailchimp}>
                        <FormControl label="Email address" error={formErrors.email}>
                            <Input placeholder="Enter email address" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </FormControl>

                        <FormControl label="Organization name" error={formErrors.organization}>
                            <Input placeholder="Enter organization name" id="organization" type="text" value={organization} onChange={e => setOrganization(e.target.value)} />
                        </FormControl>
                        
                        <FormControl label="Select your industry" error={formErrors.industry}>
                            <RadioSelect
                                fieldName="industry"
                                options={industries}
                                value={industry}
                                allowOther={true}
                                otherPlaceholder="Industry"
                                onValueChange={value => setIndustry(value)}
                                theme="dark"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            disabled={isFetching}
                            theme="light"
                            label={ isFetching ? 'Submitting...' : 'Submit' }
                        />

                        { mailChimpStg && <AlertBox info={mailChimpStg} color="success" /> }

                        { errors && errors.length > 0 && <AlertBox info={errors[0]} color="danger" /> }
                    </form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ intl, subscribe }) => {
    return {
      intl,
      subscribe,
    };
  };

export default compose(
    page(),
    connect(mapStateToProps),
    withStyles(style)
)(SubscribePage);