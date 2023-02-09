/**
 * Create the form Header H2 and div elements
 */
 function createFormHeader(form, headerText, headerDivText) {
    // ! first create a header element which has an h2 and a div inside
    const formHeader = document.createElement('header');
    formHeader.id = 'form-header';

    const formHeaderH2 = document.createElement('h2');
    formHeaderH2.id = 'form-header-h2';
    formHeaderH2.innerText = headerText;

    const formHeaderDiv = document.createElement('div');
    formHeaderDiv.id = 'form-header-div';
    formHeaderDiv.innerText = headerDivText;

    formHeader.appendChild(formHeaderH2);
    formHeader.appendChild(formHeaderDiv);

    form.appendChild(formHeader);
}

/**
 * Create a field element
 */
function createField(
    form,
    fieldType,
    fieldElement,
    fieldId,
    fieldLabel,
    fieldPlaceholder,
    options = {}
) {
    const fieldDiv = document.createElement('div');
    fieldDiv.id = `field-${fieldId}`;

    const fieldLabelElement = document.createElement('label');
    fieldLabelElement.id = `field-${fieldId}-label`;
    fieldLabelElement.className = 'desc';
    fieldLabelElement.innerText = fieldLabel;
    fieldLabelElement.htmlFor = `field-${fieldId}`;

    const fieldInputDiv = document.createElement('div');
    fieldInputDiv.id = `field-${fieldId}-input-div`;

    const fieldInput = document.createElement(fieldElement);
    fieldInput.id = `field-${fieldId}-input`;
    fieldInput.name = `field-${fieldId}-input`;
    fieldInput.type = fieldType;
    fieldInput.className = 'field text fn';
    fieldInput.value = '';
    fieldInput.placeholder = fieldPlaceholder;

    if (fieldType === 'textarea') {
        fieldInput.style.height = '100px';
        fieldInput.style.fontFamily = 'Roboto, sans-serif';
    }

    fieldInputDiv.appendChild(fieldInput);
    fieldDiv.appendChild(fieldLabelElement);
    fieldDiv.appendChild(fieldInputDiv);

    form.appendChild(fieldDiv);
}

/**
 * Create a submit button
 */
function createSubmitButton(form) {
    const submitButtonDiv = document.createElement('div');
    submitButtonDiv.id = 'submit-button-div';

    const submitButtonInputDiv = document.createElement('div');
    submitButtonInputDiv.id = 'submit-button-input-div';

    const submitButton = document.createElement('input');
    submitButton.id = 'submit-button';
    submitButton.name = 'submit-button';
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    submitButton.onclick = submitForm;

    submitButtonInputDiv.appendChild(submitButton);
    submitButtonDiv.appendChild(submitButtonInputDiv);

    form.appendChild(submitButtonDiv);
}

/**
 * Create the form
 */
function createForm() {
    const formContainer = document.createElement('form');
    formContainer.id = 'form-container';
    formContainer.action = '';
    formContainer.method = 'post';

    createFormHeader(
        formContainer,
        'Email broadcast',
        'Enter the details below to send an email to broadcast to your recipients'
    );

    // ! Subject field
    createField(
        formContainer,
        'text',
        'input',
        'subject',
        'Subject',
        'Enter your subject'
    );

    // ! Body textarea field
    createField(
        formContainer,
        'textarea',
        'textarea',
        'body',
        'Body',
        'Enter your message'
    );

    // ! recipient list field
    createField(
        formContainer,
        'textarea',
        'textarea',
        'recipient-list',
        'Recipient List',
        'Enter your recipient list. Example: johndoe@gmail.com, maryjane@gmail.com'
    );

    // ! Submit button
    createSubmitButton(formContainer);

    return formContainer;
}

function setLoadingState() {
    // ! disable the submit button

    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.disabled = true;
    }
}

function resetLoadingState() {
    // ! enable the submit button
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.disabled = false;
    }
}

function runCoreFlow(data) {
    // ! run the core flow
    setLoadingState();
    const URL = window.demo_data['trigger_url'];
    if (!URL) {
        return;
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetch(URL, options)
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            resetLoadingState();
            // ! alert with the response
            alert(data?.msg || 'Successfully notified your recipients!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Something went wrong!');
        })
        .finally(() => {
            resetLoadingState();
        });
}

function submitForm() {
    const form = document.getElementById('form-container');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const subject = document.getElementById(
                'field-subject-input'
            ).value;
            const body = document.getElementById('field-body-input').value;
            const recipientList = document
                .getElementById('field-recipient-list-input')
                .value.split(',');
            const recipientListTrimmed = recipientList.map((email) =>
                email.trim()
            );

            runCoreFlow({
                'recipients-list': recipientListTrimmed,
                subject: subject,
                body: body,
                fromAddress: 'bilal.afzal@trilogy.com',
            });
        });
    }
}

function renderForm() {
    const formContainer = createForm();
    const form = document.getElementById('form-div');
    if (form) {
        form.appendChild(formContainer);
    } else {
        // ! create a form container
        const formDivContainer = document.createElement('div');
        formDivContainer.id = 'form-div';
        formDivContainer.appendChild(formContainer);
        document.body.appendChild(formDivContainer);
    }
}

renderForm();
