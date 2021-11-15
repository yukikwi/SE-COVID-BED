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
    Sleep           1s
    Click Button    id=patient
    Sleep           1s
    Page Should Contain            Request Bed Information
    Close Browser
TCF_index_002 Index page staff btn
    Open Browser    ${URL}/        ${BROWSER}
    Sleep           1s
    Click Button    id=staff
    Sleep           1s
    Page Should Contain            Login
    Close Browser
