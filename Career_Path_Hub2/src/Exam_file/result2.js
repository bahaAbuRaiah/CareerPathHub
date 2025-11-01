// File: result2.js

document.addEventListener('DOMContentLoaded', function() {
    const scores = JSON.parse(sessionStorage.getItem('results'));

    // Specialization descriptions
    const descriptions = {
        'Computer Science': 'Based on your test analysis, we found that you enjoy solving mathematical problems like algebra and calculus and engaging in activities that require critical thinking, such as programming or robotics competitions. Thus, a Computer Science major is suitable for you, focusing on developing your programming and technology skills.',
        'Cybersecurity': 'Based on your test analysis, we found that you enjoy topics like data encryption and defending against cyber-attacks, and you are interested in understanding firewalls and intrusion detection systems. Therefore, a Cybersecurity major is ideal for you, where you will learn to protect networks and data from electronic threats.',
        'Software Engineering': 'Based on your test analysis, we found that you believe in applying fundamental principles of software design for stable applications and are interested in developing comprehensive test plans. Thus, a Software Engineering major is fitting for you, emphasizing designing and developing software with a focus on quality assurance.',
        'Computer Information Systems': 'Based on your test analysis, we found that you enjoy designing and building systems that support business operations and are curious about how data can enhance business strategies. Hence, a Computer Information Systems major suits you, focusing on developing technical solutions and managing technical projects.',
        'Business Information Technology': 'Based on your test analysis, we found that you enjoy designing IT solutions to improve business efficiency and are interested in exploring how decision support systems aid strategic decisions. Therefore, a Business Information Technology major is suitable for you, focusing on using technology to achieve business goals.',
        'Data Science and AI': 'Based on your test analysis, we found that you are fascinated by how robots learn and improve over time and enjoy using statistical methods to analyze data. Therefore, a Data Science and AI major is perfect for you, focusing on developing machine learning techniques and analyzing large datasets.'
    };

    // Determine the highest score and corresponding specialization
    const maxScoreIndex = scores.indexOf(Math.max(...scores));
    const specializations = ['Computer Science', 'Cybersecurity', 'Software Engineering', 'Computer Information Systems', 'Business Information Technology', 'Data Science and AI'];
    const recommendedSpecialization = specializations[maxScoreIndex];

    // Update the specialization recommendation text
    document.getElementById('recommendedSpecialization').textContent = recommendedSpecialization;
    document.getElementById('understandingData').innerHTML = `<p>${descriptions[recommendedSpecialization]}</p>`;

    // Initialize pie chart
    var ctxPie = document.getElementById('myPieChart').getContext('2d');
    var myPieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: specializations,
            datasets: [{
                label: 'IT Specializations',
                data: scores,
                backgroundColor: ['#483D8B', '#87CEFA', '#FF6347', '#FFD700', '#32CD32', '#8A2BE2'],
                borderColor: ['#ffffff'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Initialize bar chart
    var ctxBar = document.getElementById('myBarChart').getContext('2d');
    var myBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['CS', 'CY', 'SE', 'CIS', 'BIT', 'AI & DS'],
            datasets: [{
                label: 'Percentage',
                data: scores,
                backgroundColor: ['#483D8B', '#87CEFA', '#FF6347', '#FFD700', '#32CD32', '#8A2BE2'],
                borderColor: ['#ffffff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0
                    }
                }
            }
        }
    });
});






























// document.addEventListener('DOMContentLoaded', function() {
//     const scores = JSON.parse(sessionStorage.getItem('results'));

//     // Specialization descriptions
//     const descriptions = {
//         'Computer Science': 'Based on your test analysis, we found that you enjoy solving mathematical problems like algebra and calculus and engaging in activities that require critical thinking, such as programming or robotics competitions. Thus, a Computer Science major is suitable for you, focusing on developing your programming and technology skills.',
//         'Software Engineering': 'Based on your test analysis, we found that you believe in applying fundamental principles of software design for stable applications and are interested in developing comprehensive test plans. Thus, a Software Engineering major is fitting for you, emphasizing designing and developing software with a focus on quality assurance.',
//         'AI & DS': 'Based on your test analysis, we found that you are fascinated by how robots learn and improve over time and enjoy using statistical methods to analyze data. Therefore, a Data Science and AI major is perfect for you, focusing on developing machine learning techniques and analyzing large datasets.',
//         'BIT': 'Based on your test analysis, we found that you enjoy designing IT solutions to improve business efficiency and are interested in exploring how decision support systems aid strategic decisions. Therefore, a Business Information Technology major is suitable for you, focusing on using technology to achieve business goals.',
//         'CIS': 'Based on your test analysis, we found that you enjoy designing and building systems that support business operations and are curious about how data can enhance business strategies. Hence, a Computer Information Systems major suits you, focusing on developing technical solutions and managing technical projects.',
//         'CY': 'Based on your test analysis, we found that you enjoy topics like data encryption and defending against cyber-attacks, and you are interested in understanding firewalls and intrusion detection systems. Therefore, a Cybersecurity major is ideal for you, where you will learn to protect networks and data from electronic threats.'
//     };

//     // Determine the highest score and corresponding specialization
//     const maxScoreIndex = scores.indexOf(Math.max(...scores));
//     const specializations = ['Computer Science', 'Cyber Security','Software Engineering' ,'Computer Information Systems','Business Information Technology','Data Science and AI',];
//     const recommendedSpecialization = specializations[maxScoreIndex];

//     // Update the specialization recommendation text
//     document.getElementById('recommendedSpecialization').textContent = recommendedSpecialization;
//     document.getElementById('understandingData').innerHTML = `<p>${descriptions[recommendedSpecialization]}</p>`;

//     // Initialize pie chart
//     var ctxPie = document.getElementById('myPieChart').getContext('2d');
//     var myPieChart = new Chart(ctxPie, {
//         type: 'pie',
//         data: {
//             labels: specializations,
//             datasets: [{
//                 label: 'IT Specializations',
//                 data: scores,
//                 backgroundColor: ['#483D8B', '#87CEFA', '#FF6347', '#FFD700', '#32CD32', '#8A2BE2'],
//                 borderColor: ['#ffffff'],
//                 borderWidth: 2
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false
//         }
//     });

//     // Initialize bar chart
//     var ctxBar = document.getElementById('myBarChart').getContext('2d');
//     var myBarChart = new Chart(ctxBar, {
//         type: 'bar',
//         data: {
//             labels: ['CS', 'CY','SE','CIS','BIT', 'AI & DS'],
//             datasets: [{
//                 label: 'Percentage',
//                 data: scores,
//                 backgroundColor: ['#87CEFA', '#483D8B', '#FF6347', '#FFD700', '#32CD32', '#8A2BE2'],
//                 borderColor: ['#ffffff'],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 },
//                 x: {
//                     ticks: {
//                         autoSkip: false,
//                         maxRotation: 0,
//                         minRotation: 0
//                     }
//                 }
//             }
//         }
//     });
// });
























