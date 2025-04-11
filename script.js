document.addEventListener('DOMContentLoaded', function () 
{
    const form = document.querySelector('#form-details form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const responseMsg = document.getElementById('responseMsg');

    form.addEventListener('submit', function (e) 
    {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      // Basic validation
      if (!name || !email || !subject || !message) {
        showMessage("Please fill in all fields.", "red");
        return;
      }

      // Simulate sending message
      form.reset();
      showMessage("Thank you! Your message has been sent.", "green");
    });

    function showMessage(msg, color) {
      responseMsg.textContent = msg;
      responseMsg.style.color = color;

      // Clear message after 5 seconds
      setTimeout(() => 
      {
        responseMsg.textContent = "";
      }, 5000);
    }
});