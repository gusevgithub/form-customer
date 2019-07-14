	// ============== Query DatePicker and TimePicker script ============== //
	var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  
	// Подлючение для выбора дат работ/услуг
	$('#start_date').datepicker({
			format: 'dd.mm.yyyy',
			weekStartDay: 1,
			locale: 'ru-ru',
			uiLibrary: 'bootstrap4',
			iconsLibrary: 'fontawesome',
			modal: true,
			minDate: today,
			maxDate: function () {
					return $('#end_date').val();
			}

	});
	
	$('#end_date').datepicker({
			format: 'dd.mm.yyyy',
			weekStartDay: 1,
			locale: 'ru-ru',
			uiLibrary: 'bootstrap4',
			iconsLibrary: 'fontawesome',
			modal: true,
			minDate: today,
			minDate: function () {
					if($('#start_date').val() !== '') {
						return $('#start_date').val();
					} else {
						 var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
						 return today;
					}
					
			}
	});
	
		// Подлючение для выбора времени работ/услуг
		$('#start_time').timepicker({
			uiLibrary: 'bootstrap4',
			mode: '24hr',
			locale: 'ru-ru',
		});
		
		$('#end_time').timepicker({
			uiLibrary: 'bootstrap4',
			mode: '24hr',
			locale: 'ru-ru'
		});
	// ============== End Query DatePicker and TimePicker script ============== //
		
		// Подлючение ползунка для выбора стоимости (Query)
		$("#range_slider").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 100000,
        from: 10000,
        to: 50000,
        prefix: '&#8381;'
    });
		
		// ============== Start my form customer script ============== //

		var formControls = document.querySelectorAll('.form-control');
		var custSelect = document.querySelector('.custom-select');
		var option0 = custSelect.firstElementChild;
		
		var formNew = formControls[10].classList.add('youtel');
		var youtel = document.querySelector('.youtel');
		var myHidden = document.querySelector('#myhidden');
		
		var rangeCust = document.querySelector('#range_slider');
		
		var irsFrom = document.querySelector('.irs-from');
		var btnSub = document.querySelector('#btnsub');

		var fControlObj = {
			iTitle: formControls[0],
			iDesc: formControls[2],
			ranInfo: formControls[3],
			date1: formControls[4],
			time1: formControls[5],
			date2: formControls[6],
			time2: formControls[7],
			nSurname: formControls[8],
			email: formControls[9]
		}
		
	var funcRangeInfo = function(e) {
		if(e.target === rangeCust) {

			var strSplit = rangeCust.value.split(';');
			var sumStart = Number(strSplit[0]).toLocaleString();
			var sumEnd = Number(strSplit[1]).toLocaleString();
	
			if(sumStart !== sumEnd) {
				fControlObj.ranInfo.classList.remove('is-invalid');
				fControlObj.ranInfo.classList.add('is-valid');
				fControlObj.ranInfo.value = sumStart + ' - ' + sumEnd;
				
			} else if(sumStart === sumEnd) {
				fControlObj.ranInfo.value = sumStart;
				fControlObj.ranInfo.classList.remove('is-invalid');
				fControlObj.ranInfo.classList.add('is-valid');
			} else {
				fControlObj.ranInfo.classList.remove('is-valid');
				fControlObj.ranInfo.classList.add('is-invalid');
			}

		}
	}

	rangeCust.onchange = funcRangeInfo;
	rangeCust.oninput = funcRangeInfo;
	
	var funcControls = function(e) {
				
				var d = new Date();
				var dateParse = Date.parse(today);	// Milisecundes - year, month, date
				var getHourMinMillisec = (d.getHours() * 60 * 60 * 1000) + (d.getMinutes() * 60 * 1000);

				// Определение количества миллисекунд в стартовой дате
				if(fControlObj.date1.value !== '') {
					var iStYear = fControlObj.date1.value.slice(6);
					var iStMonth = fControlObj.date1.value.slice(3, -5);
					var iStDate = fControlObj.date1.value.slice(0,-8);
				}
				
				if(fControlObj.time1.value !== '') {
					var iStHours = fControlObj.time1.value.slice(0, -3);
					var iStMinutes = fControlObj.time1.value.slice(-2);
				}

				var stDateParse = Date.parse(new Date(iStYear, iStMonth - 1, iStDate ));

				var stTimeMillisec = (iStHours * 60 * 60 * 1000) + (iStMinutes * 60 * 1000);
				
				// Проверка по рег. в. на стартовую дату
				var myReD1 = /([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/;
				var myStDate = myReD1.test(fControlObj.date1.value);
				var myReT1 = /([0-6]\d)\:([0-6]\d)/;	// Проверка на time
				var myStHours = myReT1.test(fControlObj.time1.value);
				
				// Определение количества миллисекунд в конечной дате
				if(fControlObj.date2.value !== '') {
						var iEndYear = fControlObj.date2.value.slice(6);
						var iEndMonth = fControlObj.date2.value.slice(3, -5);
						var iEndDate = fControlObj.date2.value.slice(0,-8);
					}
					
					if(fControlObj.time2.value !== '') {
						var iEndHours = fControlObj.time2.value.slice(0, -3);
						var iEndMinutes = fControlObj.time2.value.slice(-2);
					}
					
					var endDateParse = Date.parse(new Date(iEndYear, iEndMonth - 1, iEndDate ));
					
					var endTimeMillisec = (iEndHours * 60 * 60 * 1000) + (iEndMinutes * 60 * 1000);
					
					// Проверка на дату
					var myReD2 = /([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/;	
					var myEndDate = myReD2.test(fControlObj.date2.value);
					
					var myReT2 = /([0-6]\d)\:([0-6]\d)/;	// Проверка на time
					var myEndHours = myReT2.test(fControlObj.time2.value);
					
					// Проверка на email
					var myReE = /[a-z0-9_]+(\.[a-z0-9_-]+)*@([0-9a-z][0-9a-z]*\.)+([a-z]){2,4}/i;
					var myEmail = myReE.test(fControlObj.email.value);
					
					// Проверка на phone
					var myReTel = /^\+7\ \([\d]{3}\)\ [\d]{3}-[\d]{2}-[\d]{2}$/;
					var myPhone = myReTel.test(youtel.value);
					
					
				// Определение элемента для вывода ошибок
				var invalidFeedback = e.target.parentElement.parentElement.lastElementChild;
				var titleInvalid = e.target.parentElement.lastElementChild;	// Соседний элемент ниже

				var tObj = {
					addInvalid: function() {
						e.target.classList.remove('border');
						e.target.classList.add('is-invalid');
						invalidFeedback.style.display = 'block';
					},
					remInvalid: function() {
						e.target.classList.remove('is-invalid');
						e.target.classList.add('is-valid');
						invalidFeedback.style.display = 'none';				
					}
				}
					// Условие для всех, если поле ввода пустое.
				if(e.target.value === '') {
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Выберите дату!';
					
					// Условие для заголовка (названия).
				} else if(e.target === fControlObj.iTitle && fControlObj.iTitle.value.length < 10) {
					e.target.value = '';
					tObj.addInvalid();
					titleInvalid.innerHTML = 'Введите не менее 10 символов!';
					
				} else if(e.target === fControlObj.iTitle && fControlObj.iTitle.value.length > 70) {
					e.target.value = '';
					tObj.addInvalid();
					titleInvalid.innerHTML = 'Введите не более 70 символов!';
				
					// Условие для списка - выбор марки авто.
				} else if(e.target === custSelect && custSelect.value === option0.value) {
					tObj.addInvalid();
					
					// Условие для описания работы/услуги.
				} else if(e.target === fControlObj.iDesc && fControlObj.iDesc.value.length < 50) {
					tObj.addInvalid();
					titleInvalid.innerHTML = 'Введите не менее 50 символов!';
					
					} else if(e.target === fControlObj.iDesc && fControlObj.iDesc.value.length > 1000) {
					tObj.addInvalid();
					titleInvalid.innerHTML = 'Введите не более 1000 символов!';
					
					// Условия для стартовой даты.
				} else if(e.target === fControlObj.date1 && fControlObj.date1.value.length !== 10) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Некорректная дата!';
				
				} else if(e.target === fControlObj.date1 && myStDate != true) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Некорректный ввод!';
					
				} else if(e.target === fControlObj.date1 && stDateParse < dateParse) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Прошедшая дата!';
					
					// Условия для конечной даты.
				} else if(e.target === fControlObj.date2 && fControlObj.date2.value.length !== 10) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Некорректная дата!';
				
				} else if(e.target === fControlObj.date2 && myEndDate != true) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Некорректный ввод!';
					
				} else if(e.target === fControlObj.date2 && endDateParse < stDateParse) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Увеличьте дату!';
					
				} else if(e.target === fControlObj.date2 && fControlObj.date1.value === '') {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Нет начальной даты!';
					
					//Условия для начального времени
				} else if(e.target === fControlObj.time1 && fControlObj.date1.value === '') {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Ввод после даты!';
					
				} else if(e.target === fControlObj.time1 && fControlObj.time1.value.length !== 5) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Некорректное время!';
				
				} else if(e.target === fControlObj.time1 && myStHours != true) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Некорректный ввод!';
					
				} else if(e.target === fControlObj.time1 && stTimeMillisec < getHourMinMillisec) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Увеличьте время!';
					
					//Условия для конечного времени
				} else if(e.target === fControlObj.time2 && fControlObj.date2.value === '') {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Ввод после даты!';
					
				} else if(e.target === fControlObj.time2 && fControlObj.time1.value === '') {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Ввод после 1-го времени!';
					
				} else if(e.target === fControlObj.time2 && fControlObj.date2.value === '') {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Ввод после даты!';
					
				} else if(e.target === fControlObj.time2 && fControlObj.time2.value.length !== 5) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Некорректное время!';
				
				} else if(e.target === fControlObj.time2 && myEndHours != true) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Некорректный ввод!';
					
				} else if(e.target === fControlObj.time2 && endTimeMillisec < stTimeMillisec) {
					e.target.value = '';
					tObj.addInvalid();
					invalidFeedback.innerHTML = 'Увеличьте время!';
					
					// Условие для имени и фамилии.
				} else if(e.target === fControlObj.nSurname && fControlObj.nSurname.value.length < 4) {
					e.target.value = '';
					tObj.addInvalid();
					titleInvalid.innerHTML = 'Мало символов!';
					
				} else if(e.target === fControlObj.nSurname && fControlObj.nSurname.value.length > 50) {
					e.target.value = '';
					tObj.addInvalid();
					titleInvalid.innerHTML = 'Много символов!';
					
					// Условие для email
				} else if(e.target === fControlObj.email && myEmail != true) {
					e.target.value = '';
					tObj.addInvalid();
					titleInvalid.innerHTML = 'Некорректный e-mail';
				
				} else {
					tObj.remInvalid();
					invalidFeedback.innerHTML = '';
				}

			}
		
		for(var i = 0; i < formControls.length; i++) {

			formControls[i].onchange = funcControls;

		}
		
		// Проверка на phone
		var myReTel = /^\+7\ \([\d]{3}\)\ [\d]{3}-[\d]{2}-[\d]{2}$/;
		var myPhone = myReTel.test(youtel.value);

		var funcPhone = function(e) {
				
			var titleInvalid = e.target.parentElement.lastElementChild;	// Соседний элемент ниже
			
			var tObj = {
				addInvalid: function() {
					e.target.classList.remove('border');
					e.target.classList.add('is-invalid');
					titleInvalid.style.display = 'block';
				},
				remInvalid: function() {
					e.target.classList.remove('is-invalid');
					e.target.classList.add('is-valid');
					titleInvalid.style.display = 'none';				
				}
			}
			
			// Условие для телефона
			var str = youtel.value;
			// Например с +7 (965) 249-41-85 на 89652494185
			var str2 = str.replace('+7', '8');
			var strReplace = str2.replace(/[\(\)\s-_]/g, ''); 
			
			myHidden.value = strReplace;
			
			if(e.target === youtel && myHidden.value.length != 11) {
				tObj.addInvalid();
				titleInvalid.innerHTML = 'Введите номер телефона!';
			} else {
				tObj.remInvalid();
				titleInvalid.innerHTML = '';
			}
		}
		youtel.addEventListener('focus', funcPhone);
		youtel.addEventListener('keyup', funcPhone);
		
	// ============== End my form customer script ============== //