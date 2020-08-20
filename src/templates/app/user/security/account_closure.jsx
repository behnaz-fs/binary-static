import React               from 'react';
// import { Client }          from '../../../../javascript/app/base/client';
// import { CommonFunctions } from '../../../../javascript/_common/common_functions';
import {
    SubmitButton }         from '../../../_common/components/forms.jsx';
import Loading             from '../../../_common/components/loading.jsx';

const AccountClosureDialog = () => (
    <div id='account_closure_warning' className='account-closure-dialog lightbox'>
        <div id='account_closure_warning_content' className='account-closure-dialog-content gr-padding-10 gr-gutter'>
            <div className='center-text gr-padding-10'>
                <img
                    id='ic-emergency'
                    className='responsive'
                    src={it.url_for('images/pages/account_closure/ic-emergency.svg')}
                />
                <h1 className='gr-padding-10'>{it.L('Warning!')}</h1>
                <p className='warning-msg'>{it.L('If you deactivate:')}</p>
                <p className='warning-msg'>{it.L('You’ll be logged out automatically.')}</p>
                <p className='warning-msg'>{it.L('You will [_1]NOT[_2] be able to log in again.', '<span id="red-msg">', '</span>')}</p>
            </div>
            <div className='center-text gr-centered gr-padding-10 gr-child'>
                <a className='back button button-secondary' href='javascript:;'><span id='span-btn'>{it.L('Back')}</span></a>
                <button id='deactivate' className='button btn-size' type='submit'>{it.L('Deactivate')}</button>
            </div>
        </div>
    </div>
);

const AccountClosureError = () => (
    <div id='account_closure_error' className='account-closure-dialog lightbox'>
        <div id='account_closure_error_content' className='account-closure-dialog-content gr-padding-10 gr-gutter'>
            <div className='gr-padding-10 gr-parent'>
                <h3 className='secondary-color'>{it.L('Action required')}</h3>
                <div className='gr-padding-20 gr-parent invisible' id='account_closure_open'>
                    {it.L('You have open positions in these Binary accounts:')}
                </div>
                <div className='gr-padding-20 gr-parent invisible' id='account_closure_balance'>
                    {it.L('You have funds in these Binary accounts:')}
                </div>
                <div className='gr-padding-20 gr-parent invisible' id='account_closure_open_mt'>
                    {it.L('You have open positions in these MT5 accounts:')}
                </div>
                <div className='gr-padding-20 gr-parent invisible' id='account_closure_balance_mt'>
                    {it.L('You have funds in these MT5 accounts:')}
                </div>
            </div>
            <div id='account_closure_error_buttons' className='gr-padding-10 gr-child'>
                <button className='back button no-margin'>{it.L('OK')}</button>
            </div>
        </div>
    </div>
);

const AccountClosure = () => (
    <React.Fragment>
        <div className='invisible' id='closure_loading'>
            <Loading />
        </div>
        <div id='logged_out' className='invisible'>
            <h1>{it.L('Account Closure')}</h1>
        </div>
        <div id='msg_main' className='gr-gutter gr-padding-10 invisible'>
            <h1 className='text-bold'>{it.L('Your account is now closed')}</h1>
            <p className='notice-msg'>
                {it.L('You’ve successfully closed your account. We’ll send a confirmation email to [_1].', '<span id="current_email"></span>')}
            </p>
            <br />
            <br />
            <p className='center-text'>{it.L('This page will redirect to the [_1] homepage after 10 seconds.', it.website_name)}</p>
        </div>
        <div id='closure_container' className='account-closure invisible'>
            <div id='main_header' className='gr-padding-30'>
                <h1 id='heading'>{it.L('Deactivate account')}</h1>
                <p>{it.L('Before you deactivate your account, you need to do the following:', it.website_name)}</p>
                <h2 id='heading'>{it.L('1. Close all open positions')}</h2>
                <p>{it.L('If you have a Deriv real account, go to Portfolio to close any open positions.<br>If you have a DMT5 real account, log into it to close any open positions.', it.website_name)}</p>
                <h2 id='heading'>{it.L('2. Withdraw your funds')}</h2>
                <p>{it.L('If you have a Deriv real account, go to Cashier to withdraw your funds.<br>If you have a DMT5 real account, go to DMT5 Dashboard to withdraw your funds.', it.website_name)}</p>
            </div>

            <div className='invisible' id='submit_loading'>
                <Loading />
            </div>

            <form id='form_closure'>
                <SubmitButton
                    text={it.L('Continue to account deactivation')}
                    is_centered
                    type='submit'
                />
            </form>
            <AccountClosureDialog />
            <AccountClosureError />
        </div>
    </React.Fragment>
);

export default AccountClosure;
