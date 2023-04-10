function handleChange(event) {
	let targetanswer = event.target.getAttribute('data-target')
	document.querySelector('[data-for-css="' + targetanswer + '"]').classList.remove('dbn')
	document.querySelector('[data-for="' + targetanswer + '"]').setAttribute("data-required", "true")
}

function handleChange1(event) {
	let targetanswer = event.target.getAttribute('data-target')
	if (document.querySelector('[data-for-css="' + targetanswer + '"]')) {
		document.querySelector('[data-for-css="' + targetanswer + '"]').classList.add('dbn')
	}
	if (document.querySelector('[data-for="' + targetanswer + '"]')) {
		document.querySelector('[data-for="' + targetanswer + '"]').setAttribute("data-required", "false")
	}
}

function validateAnswers() {
	let t = true
	let message_uz = ""
	let message_ru = ""
	inputs = document.querySelectorAll('[data-required="true"]')
	inputs.forEach(element => {
		if (element.value == "") {
			t = false
			message_uz = 'Majburiy maydon to\'ldirilmadi!!! '
			message_ru = 'Обязательное поле не заполнено!!! '
		}
	});
	const data = new FormData(document.getElementById('answer_form'));
	answers.forEach(elem => {
		if (elem.type == "simple") {
			if (data.get(elem.name) == null) {
				t = false
				message_uz = 'Iltimos barcha savollarga javob bering!!! '
				message_ru = 'Пожалуйста, ответьте на все вопросы!!! '
			}
		}
	})
	return {
		validated: t,
		message: {
			message_uz: message_uz,
			message_ru: message_ru
		}
	};
}

$(document).ready(function () {
	const element = document.getElementById('answer_form');
	element.addEventListener('submit', event => {
		event.preventDefault();
		let validate = validateAnswers();
		if (validate.validated) {
			const data = new FormData(document.getElementById('answer_form'));
			let my_answers = []
			answers.forEach(elem => {
				let answer = {
					name: "",
					answer: "",
					text: ""
				}

				answer.name = elem.name
				if (elem.type == "simple") {
					answer.answer = data.get(elem.name)
					answer.text = data.get(elem.name + "_input") || ""
				}
				if (elem.type == "text") {
					answer.text = data.get("input_" + elem.name)
				}
				my_answers.push(answer)
			})

			const options = {
				url: '/fulltest/correctsforall',
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json;charset=UTF-8'
				},
				data: my_answers
			}
			axios(options)
				.then(response => {
					const test = response.data
					console.log(test.saved)
					if(test.saved == true){
						alert("So'rovnoma qabul qilindi. Анкета получена")
						window.location.reload();
					} else {
						alert("Xatolik yuzaga keldi. Произошла ошибка.")
					}
				})
				.catch(err => {
					console.log(err)
					alert('Error: ' + 'Xatolik yuzaga keldi')
				})
		} else {
			alert(validate.message.message_uz + validate.message.message_ru)
		}
	});
})