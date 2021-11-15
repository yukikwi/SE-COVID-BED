*** Settings ***
Library     SeleniumLibrary

*** Variables ***
${BROWSER}          chrome
${URL}              http://localhost:3000/
${SUSERNAME}        capybara
${HUSERNAME}        capybaraHospital
${PASSWORD}         123456

*** Test Cases ***
# Index page
TCF_index_001 Index page patient btn
    Open Browser    ${URL}/        ${BROWSER}
    Sleep           3s
    Click Button    id=patient
    Sleep           3s
    Page Should Contain            Request Bed Information
    Close Browser
TCF_index_002 Index page staff btn
    Open Browser    ${URL}/        ${BROWSER}
    Sleep           3s
    Click Button    id=staff
    Sleep           3s
    Page Should Contain            Login
    Close Browser

# Login page
TCF_login_001 Test login as hospital
    Open Browser    ${URL}/login            ${BROWSER}
    Input Text      id=basic_username       ${HUSERNAME}
    Input Text      id=basic_password       ${PASSWORD}
    Submit Form
    Sleep           3s
    Page Should Contain                     Capybara Hospital : Information
    Close Browser
TCF_login_002 Test login as system admin
    Open Browser    ${URL}/login            ${BROWSER}
    Input Text      id=basic_username       ${SUSERNAME}
    Input Text      id=basic_password       ${PASSWORD}
    Submit Form
    Sleep           3s
    Page Should Contain                     Hospital List
    Close Browser
TCF_login_003 Test login as wrong credential
    Open Browser    ${URL}/login            ${BROWSER}
    Input Text      id=basic_username       ${SUSERNAME}
    Input Text      id=basic_password       barara
    Submit Form
    Sleep           3s
    Page Should Contain                     error
    Close Browser