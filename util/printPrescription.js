import {printAsync} from 'expo-print';

export const print = async (name, gender, prescription, healthWorkerName) => {
	const Fulldate = new Date();
    const date = Fulldate.getDate();
    const month = Fulldate.getMonth() + 1;
    const year = Fulldate.getFullYear();
    const dateVal = date + "-" + (month >= 10 ? month : ("0" + month)) + "-" + year;
    const dateandTime =dateVal+" "+ Fulldate.toLocaleTimeString();
    const html = `
        <!DOCTYPE html>
    <html>
    <head>
	<title>Prescription</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			margin: 0;
			padding: 0;
			background-color: #f5f5f5;
		}

		.container {
			max-width: 800px;
			margin: 0 auto;
			padding: 30px;
			background-color: #fff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}

		h1, h2, h3 {
			margin: 0;
			padding: 0;
		}

		h1 {
			font-size: 28px;
			font-weight: bold;
			text-align: center;
			margin-bottom: 20px;
		}

		h2 {
			font-size: 22px;
			font-weight: bold;
			margin-bottom: 10px;
		}

		h3 {
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 5px;
		}

		p {
			margin: 0;
			padding: 0;
			line-height: 1.5;
		}

		.patient-info {
			margin-bottom: 20px;
		}

		.prescription {
			margin-top: 20px;
		}

		.prescription {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		.prescription {
			margin-bottom: 580px;
		}

		.footer {
			margin-top: 20px;
			text-align: center;
			font-size: 14px;
			color: #999;
		}
	</style>
</head>
<body>
	<div class="container">
    <div style="font-size: x-large;padding: 10px; ">Rx</div>
    <h1 >Prescription</h1>
    <br style="border-;"/>
    <div class="patient-info">
			<h2>Patient Information</h2>
			<p><strong>Name:   </strong> ${name}</p>
			<p><strong>Gender: </strong> ${gender}</p>
			<p><strong>Date:   </strong> ${dateVal}</p>
		</div>
		<div class="prescription">
			<h2>Prescription</h2>
			<p style="text-align:justify;word-wrap: break-word;">
                ${prescription}
            </p>
		</div>
		<div class="footer">
			<p>Generated by ${healthWorkerName} on ${dateandTime}.</p>
		</div>
	</div>
</body>
</html>
`;

    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await printAsync({
        html,
    });

};