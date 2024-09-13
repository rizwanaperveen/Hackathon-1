document.getElementById('resume-path')?.addEventListener('submit', function (event) {
    event?.preventDefault();
    //const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name');
    const cnicElement = document.getElementById('cnic');
    const educationElement = document.getElementById('education');
    const skillsElement = document.getElementById('skills');
    const contactElement = document.getElementById('contact');
    const addressElement = document.getElementById('address');
    const emailElement = document.getElementById('email');
    const giturlElement = document.getElementById('giturl');
    const nationalityElement = document.getElementById('nationality');
    const usernameElement = document.getElementById('username');
    if (nameElement && cnicElement && educationElement && skillsElement && contactElement && addressElement && emailElement && giturlElement && nationalityElement && usernameElement) {
        const name = nameElement.value;
        const cnic = cnicElement.value;
        const education = educationElement.value;
        const skills = skillsElement.value;
        const contact = contactElement.value;
        const address = addressElement.value;
        const email = emailElement.value;
        const giturl = giturlElement.value;
        const nationality = nationalityElement.value;
        const username = usernameElement.value;
        const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;
        const resumeOutput = `
<h2>Resume<h2>
<p><strong>Name:</strong> <span id="name-edit" class="editable"> ${name} </span></p>
<p><strong>CNIC:</strong> <span id="cnic-edit" class="editable">${cnic} </span></p>
<p><strong>Education:</strong> <span id="education-edit" class="editable">${education} </span></p>
<p><strong>Skills:</strong> <span id="skills-edit" class="editable">${skills} </span></p>
<p><strong>Contact:</strong> <span id="contact-edit" class="editable">${contact} </span></p>
<p><strong>Address:</strong> <span id="address-edit" class="editable">${address} </span></p>
<p><strong>Email:</strong> <span id="email-edit" class="editable">${email} </span></p>
<p><strong>Git URL:</strong> <span id="giturl-edit" class="editable">${giturl} </span></p>
<p><strong>Nationality:</strong> <span id="nationality-edit" class="editable">${nationality} </span></p>
`;
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8, ' + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'DownLoad your 2024 resume';
        //Display the resume output
        const resumeOutputElement = document.getElementById('resume-Output');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            //resumeOutputElement.classList.remove('hidden');
            makeEditable();
        }
        //create buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.id = 'buttonsContainer';
        // resumeOutputElement.appendChild(buttonsContainer);
        //add download pdf
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Downnload as PDF';
        downloadButton.addEventListener("click", () => {
            window.print(); //open the print dialog, allowing user to save as pdf.
        });
        buttonsContainer.appendChild(downloadButton);
        //add shareable link button
        const shareableLinkButton = document.createElement('button');
        shareableLinkButton.textContent = 'Copy Shareable Link';
        shareableLinkButton.addEventListener('click', async () => {
            try {
                //create a unique shareable link
                const shareableLink = `https://yourdomain.com/resumes/${name.replace(/\s+/g, "_")}_cv.html`;
                //Use clipboard api to copy the shareable link
                await navigator.clipboard.writeText(shareableLink);
                alert('Shareable Link cpied to clipboard');
            }
            catch (err) {
                console.error('Failed to copy link ', err);
                alert("Failed to copy please try again.");
            }
        });
        buttonsContainer.appendChild(shareableLinkButton);
    }
    function makeEditable() {
        const editableElements = document.querySelectorAll('.editable');
        editableElements.forEach(element => {
            element.addEventListener('click', function () {
                const currentElement = element;
                const currentValue = currentElement.textContent || "";
                if (currentElement.tagName === "p" || currentElement.tagName === "span") {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = currentValue;
                    input.classList.add('editing-input');
                    input.addEventListener('blur', function () {
                        currentElement.textContent = input.value;
                        currentElement.style.display = 'inline';
                        input.remove();
                    });
                    currentElement.style.display = 'none';
                    currentElement.parentNode?.insertBefore(input, currentElement);
                    input.focus();
                }
            });
        });
    }
});
export {};
