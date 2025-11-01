document.addEventListener('DOMContentLoaded', function() {
    // Clear previous results from sessionStorage
    sessionStorage.removeItem('results');

    const models = document.querySelectorAll('.careerTest');
    models.forEach(model => model.style.display = 'none');

    // Randomly select one model to display
    const selectedIndex = Math.floor(Math.random() * models.length);
    const selectedModel = models[selectedIndex];
    selectedModel.style.display = 'block';

    const parts = selectedModel.querySelectorAll('.part');
    let currentPartIndex = 0;
    parts.forEach(part => part.style.display = 'none');
    parts[currentPartIndex].style.display = 'block';

    const nextButton = selectedModel.querySelector('.nextButton');
    const finishButton = selectedModel.querySelector('.finishButton');
    finishButton.style.display = 'none';

    nextButton.addEventListener('click', function() {
        if (currentPartIndex < parts.length - 1) {
            parts[currentPartIndex].style.display = 'none';
            currentPartIndex++;
            parts[currentPartIndex].style.display = 'block';

            if (currentPartIndex === parts.length - 1) {
                nextButton.style.display = 'none';
                finishButton.style.display = 'block';
            }
        }
    });

    finishButton.addEventListener('click', function() {
        selectedModel.submit();
    });
});

document.querySelectorAll('.careerTest').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const scores = [0, 0, 0, 0, 0, 0];
        const inputs = form.querySelectorAll('input[type="radio"]:checked');
        const totalQuestions = 18;
        const totalPointsPossiblePerSpecialization = 15; // Each specialization has 3 questions, max score 5 each

        if (inputs.length < totalQuestions) {
            // If not all questions are answered, use default equal percentages
            const equalPercentage = new Array(6).fill(100 / 6);  // Six specializations, equal parts
            sessionStorage.setItem('results', JSON.stringify(equalPercentage));
            alert("Please complete all questions. Displaying default equal proportions.");
        } else {
            inputs.forEach(input => {
                const questionIndex = parseInt(input.name.substring(1)) - 1;
                const specializationIndex = Math.floor(questionIndex / 3);
                scores[specializationIndex] += parseInt(input.value);
            });

            // Define total score possible per specialization
            const totalPointsPossible = totalPointsPossiblePerSpecialization * 6; // Six specializations

            // Calculate raw percentages based on scores
            const rawPercentages = scores.map(score => (score / totalPointsPossiblePerSpecialization) * 100);

            // Normalize the percentages to sum to 100%
            const sumRawPercentages = rawPercentages.reduce((acc, num) => acc + num, 0);
            const normalizedPercentages = rawPercentages.map(p => (p / sumRawPercentages) * 100);

            // Round percentages to two decimal places
            const roundedPercentages = normalizedPercentages.map(p => Math.round(p * 100) / 100);

            // Ensure the sum is exactly 100% by adjusting the highest value
            let sumRoundedPercentages = roundedPercentages.reduce((acc, num) => acc + num, 0);
            if (sumRoundedPercentages !== 100) {
                const difference = 100 - sumRoundedPercentages;
                const maxIndex = roundedPercentages.indexOf(Math.max(...roundedPercentages));
                roundedPercentages[maxIndex] += difference;
            }

            // Ensure order is correct: CS, CY, SE, CIS, BIT, AI & DS
            const orderedPercentages = [
                roundedPercentages[0], // CS
                roundedPercentages[1], // CY
                roundedPercentages[2], // SE
                roundedPercentages[3], // CIS
                roundedPercentages[4], // BIT
                roundedPercentages[5]  // AI & DS
            ];

            // Find the highest percentage and its corresponding specialization
            const specializations = [
                'Computer Science',
                'Cybersecurity',
                'Software Engineering',
                'Computer Information Systems',
                'Business Information Technology',
                'Data Science and AI'
            ];
            const highestPercentageIndex = orderedPercentages.indexOf(Math.max(...orderedPercentages));
            const recommendedSpecialization = specializations[highestPercentageIndex];

            // Descriptions for each specialization
            const descriptions = {
                'Computer Science': 'Based on your test analysis, we found that you enjoy solving mathematical problems like algebra and calculus and engaging in activities that require critical thinking, such as programming or robotics competitions. Thus, a Computer Science major is suitable for you, focusing on developing your programming and technology skills.',
                'Cybersecurity': 'Based on your test analysis, we found that you enjoy topics like data encryption and defending against cyber-attacks, and you are interested in understanding firewalls and intrusion detection systems. Therefore, a Cybersecurity major is ideal for you, where you will learn to protect networks and data from electronic threats.',
                'Software Engineering': 'Based on your test analysis, we found that you believe in applying fundamental principles of software design for stable applications and are interested in developing comprehensive test plans. Thus, a Software Engineering major is fitting for you, emphasizing designing and developing software with a focus on quality assurance.',
                'Computer Information Systems': 'Based on your test analysis, we found that you enjoy designing and building systems that support business operations and are curious about how data can enhance business strategies. Hence, a Computer Information Systems major suits you, focusing on developing technical solutions and managing technical projects.',
                'Business Information Technology': 'Based on your test analysis, we found that you enjoy designing IT solutions to improve business efficiency and are interested in exploring how decision support systems aid strategic decisions. Therefore, a Business Information Technology major is suitable for you, focusing on using technology to achieve business goals.',
                'Data Science and AI': 'Based on your test analysis, we found that you are fascinated by how robots learn and improve over time and enjoy using statistical methods to analyze data. Therefore, a Data Science and AI major is perfect for you, focusing on developing machine learning techniques and analyzing large datasets.'
            };

            // Update understandingData section with the description
            const understandingDataSection = document.getElementById('understandingData');
            if (understandingDataSection) {
                understandingDataSection.innerHTML = `<p>${descriptions[recommendedSpecialization]}</p>`;
            }

            // Log the results for debugging
            console.log("Scores: ", scores);
            console.log("Raw Percentages: ", rawPercentages);
            console.log("Normalized Percentages: ", normalizedPercentages);
            console.log("Rounded Percentages: ", roundedPercentages);
            console.log("Ordered Percentages: ", orderedPercentages);
            console.log("Recommended Specialization: ", recommendedSpecialization);

            // Save the results and the recommended specialization
            sessionStorage.setItem('results', JSON.stringify(orderedPercentages));
            sessionStorage.setItem('recommendedSpecialization', recommendedSpecialization);
        }

        window.location.href = './result.html';
    });
});
