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
    Page Should Contain                     Hospital Information
    Run Keyword     KWF_HOS_001 Show patient list
    Run Keyword     KWF_HOS_007 Show resource list
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
    Run Keyword     KWF_SYS_003 Edit hospital info fetch test
    Run Keyword     KWF_SYS_004 Edit hospital info edit test
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
KWF_SYS_001 View hospital info fetch test
    Click Link      id=hospital-6165a8b28e0dcd5dbc863fc3-view
    Sleep           3s
    Page Should Contain            Capybara Hospital
    Click Link      id=back-to-system
    Sleep           3s
    Page Should Contain            Hospital List
KWF_SYS_002 Delete hospital
    Click Link      id=hospital-6165a8b28e0dcd5dbc863fc3-delete
    Sleep           3s
    Page Should Contain            Delete Hospital (Capybara Hospital)
    Press Keys	    None	    ESC
KWF_SYS_003 Edit hospital info fetch test
    Click Link      id=hospital-6165a8b28e0dcd5dbc863fc3-edit
    Sleep           3s
    Page Should Contain            Capybara Hospital
    Press Keys	    None	    ESC
KWF_SYS_004 Edit hospital info edit test
    Click Link      id=hospital-6165a8b28e0dcd5dbc863fc3-edit
    Sleep           3s
    Page Should Contain            Capybara Hospital
    Input Text      id=basic_hospitalName       Capybara Hospital2         clear=True
    Submit Form
    Sleep           3s
    Press Keys	    None	    ESC
    Sleep           1s
    Page Should Contain            Capybara Hospital2
    # Restore data
    Click Link      id=hospital-6165a8b28e0dcd5dbc863fc3-edit
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
    Run Keyword     KWF_HOS_002 Approve patient
    Run Keyword     KWF_HOS_003 Discharge patient
    Run Keyword     KWF_HOS_004 View patient
    Click Button    id=tab-in-progress
    Sleep           1s
    Page Should Contain            NonTokTakTay
    Run Keyword     KWF_HOS_005 Edit patient
    Click Button    id=tab-complete
    Sleep           1s
    Page Should Contain            bara2
    Click Button    id=tab-request
    Sleep           1s
    Page Should Contain            aa
    Run Keyword     KWF_HOS_006 Add patient
KWF_HOS_002 Approve patient
    Click Link      id=patient-6198aa6712d95c92e6f79f1e-approve
    Sleep           3s
    Page Should Contain         Approve patient
    Press Keys	    None	    ESC
    Sleep           1s
KWF_HOS_003 Discharge patient
    Click Link      id=patient-6198aa6712d95c92e6f79f1e-discharge
    Sleep           3s
    Page Should Contain         Discharge patient
    Press Keys	    None	    ESC
    Sleep           1s
KWF_HOS_004 View patient
    Click Link      id=patient-6198b34169d4c23392ce5623-view
    Sleep           3s
    Page Should Contain         View Patient Information
    Press Keys	    None	    ESC
    Sleep           1s
KWF_HOS_005 Edit patient
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
KWF_HOS_006 Add patient
    Click Button      id=add-patient
    Sleep           3s
    Page Should Contain         Add Patient Information
    Press Keys	    None	    ESC
    Sleep           1s

KWF_HOS_007 Show resource list
    Click Link      id=resource
    Sleep           3s
    Page Should Contain            Bed
    Run Keyword     KWF_HOS_008 Edit resource
    Run Keyword     KWF_HOS_009 View resource
    Run Keyword     KWF_HOS_010 Delete resource
    Run Keyword     KWF_HOS_011 Add resource
KWF_HOS_008 Edit resource
    Click Link      id=resource-61829f1ad8c327e93e718cea-edit
    Sleep           1s
    Input Text      id=basic_resourceName       King size bed         clear=True
    Submit Form
    Sleep           3s
    Press Keys	    None	    ESC
    Sleep           1s
    Page Should Contain            King size bed
    Click Link      id=resource-61829f1ad8c327e93e718cea-edit
    Sleep           1s
    Input Text      id=basic_resourceName       Bed         clear=True
    Submit Form
    Sleep           3s
    Press Keys	    None	    ESC
    Sleep           1s
    Page Should Contain            Bed
    Sleep           1s
KWF_HOS_009 View resource
    Click Link      id=resource-61829f1ad8c327e93e718cea-view
    Sleep           3s
    Page Should Contain         View Resource Information
    Press Keys	    None	    ESC
    Sleep           1s
KWF_HOS_010 Delete resource
    Click Link      id=resource-61829f1ad8c327e93e718cea-remove
    Sleep           3s
    Page Should Contain         Delete Resource
    Press Keys	    None	    ESC
    Sleep           1s
KWF_HOS_011 Add resource
    Click Button      id=add-resource
    Sleep           3s
    Page Should Contain         Add Resource Information
    Press Keys	    None	    ESC
    Sleep           1s