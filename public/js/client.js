// Make Connection
const socket = io.connect('http://localhost:3000', { 'forceNew': true })

// Query DOM
let nickname = document.getElementById('nickname'),
		message = document.getElementById('message'),
		btn = document.getElementById('send'),
		output = document.getElementById('output');

// Emit Events
btn.addEventListener('click', () => {
	socket.emit('chat', {
		nickname: nickname.value,
		message: message.value
	})
})

// Listen for events
socket.on('chat', (data) => {
	let error = document.getElementById('feedback')
	if ((data.nickname == '') && (data.message == '')) {
		error.style.display = "block";
		feedback.innerHTML = 'Please enter a Nickname and a Message !'
	}
	else if (data.nickname == '') {		
		error.style.display = "block";
		feedback.innerHTML = 'Please enter a Nickname !'
	} 
	else if (data.message == '') {
		error.style.display = "block";
		feedback.innerHTML = 'Please enter a Message !'
	}
  else  {
		feedback.innerHTML = 'Message sent !'
		output.innerHTML += '<p><strong>' + data.nickname + ' : </strong>' + data.message + '</p>'
	}	
})
