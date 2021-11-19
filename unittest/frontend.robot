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
    Sleep           3s
    Input Text      id=basic_username       ${HUSERNAME}
    Input Text      id=basic_password       ${PASSWORD}
    Submit Form
    Sleep           3s
    Page Should Contain                     Capybara Hospital : Information
    Run Keyword     KWF_HOS_001 Show patient list
    Run Keyword     KWF_logout Test logout
    Close Browser
TCF_login_002 Test login as system admin
    Open Browser    ${URL}/login            ${BROWSER}
    Sleep           3s
    Input Text      id=basic_username       ${SUSERNAME}
    Input Text      id=basic_password       ${PASSWORD}
    Submit Form
    Sleep           3s
    Page Should Contain                     Hospital List
    Run Keyword     KWF_SYS_001 Edit hospital info fetch test
    Run Keyword     KWF_SYS_002 Edit hospital info edit test
    Run Keyword     KWF_logout Test logout
    Close Browser
TCF_login_003 Test login as wrong credential
    Open Browser    ${URL}/login            ${BROWSER}
    Sleep           3s
    Input Text      id=basic_username       ${SUSERNAME}
    Input Text      id=basic_password       barara
    Submit Form
    Sleep           3s
    Page Should Contain                     Wrong username / password
    Close Browser

*** Keywords ***
KWF_logout Test logout
    Click Link      id=logout
    Sleep           3s
    Page Should Contain            Login

# System admin test
KWF_SYS_001 Edit hospital info fetch test
    Click Link      id=hospital-6165a8b28e0dcd5dbc863fc3
    Sleep           3s
    Page Should Contain            Capybara Hospital
    Press Keys	    None	    ESC
KWF_SYS_002 Edit hospital info edit test
    Click Link      id=hospital-6165a8b28e0dcd5dbc863fc3
    Sleep           3s
    Page Should Contain            Capybara Hospital
    Input Text      id=basic_hospitalName       Capybara Hospital2         clear=True
    Submit Form
    Sleep           3s
    Press Keys	    None	    ESC
    Sleep           1s
    Page Should Contain            Capybara Hospital2
    # Restore data
    Click Link      id=hospital-6165a8b28e0dcd5dbc863fc3
    Sleep           3s
    Page Should Contain            Capybara Hospital2
    Input Text      id=basic_hospitalName       Capybara Hospital          clear=True
    Submit Form
    Sleep           3s
    Press Keys	    None	    ESC
    Sleep           1s
    Page Should Contain            Capybara Hospital
    Press Keys	    None	    ESC

# Hospital test
KWF_HOS_001 Show patient list
    Click Link      id=patient
    Sleep           3s
    Page Should Contain            aa
    Click Button    id=tab-in-progress
    Sleep           1s
    Page Should Contain            NonTokTakTay
    Run Keyword     KWF_HOS_002 Edit patient
    Click Button    id=tab-complete
    Sleep           1s
    Page Should Contain            bara2
    Click Button    id=tab-request
    Sleep           1s
    Page Should Contain            aa
KWF_HOS_002 Edit patient
    Click Link      id=patient-617031a84c14d30e282bf2d3-edit
    Sleep           1s
    Input Text      id=basic_patientName       NonTokTakTayA         clear=True
    Submit Form
    Sleep           3s
    Press Keys	    None	    ESC
    Sleep           1s
    Page Should Contain            NonTokTakTayA
    Click Link      id=patient-617031a84c14d30e282bf2d3-edit
    Sleep           1s
    Input Text      id=basic_patientName       NonTokTakTay         clear=True
    Submit Form
    Sleep           3s
    Press Keys	    None	    ESC
    Sleep           1s
    Page Should Contain            NonTokTakTay