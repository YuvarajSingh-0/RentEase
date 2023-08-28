const issuesData = [
    {
        house_no: '12',
        resident: 'John Doe',
        img:"https://th.bing.com/th/id/R.019d17457a46330d19eab4acfb0d94f9?rik=m%2bnDYOKcnyT6BQ&riu=http%3a%2f%2fcampus.murraystate.edu%2facademic%2ffaculty%2fBAtieh%2fHouse17.jpg&ehk=pGtHIgJgUEBMiYaxKn9JZaHEz%2bVdNI%2bKKdxVzXJOIcY%3d&risl=&pid=ImgRaw&r=0",
        issues: [
            {
                description: 'Water Leakage',
                status: 'pending',
            },
            {
                description: 'Electrical Issue',
                status: 'resolved',
            },
        ],
    },
    {
        house_no: '5',
        img:"https://th.bing.com/th/id/OIP.nynfKuZ7xUA58B-n6jQS0wHaE6?pid=ImgDet&rs=1",
        resident: 'Jane Smith',
        issues: [
            {
                description: 'Heating Problem',
                status: 'resolved',
            },
        ],
    },
    {
        house_no: '8',
        resident: 'Mike Johnson',
        img:"https://th.bing.com/th/id/OIP.nynfKuZ7xUA58B-n6jQS0wHaE6?w=294&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        issues: [
            {
                description: 'Broken Lock',
                status: 'pending',
            },
            {
                description: 'Plumbing Issue',
                status: 'resolved',
            },
            {
                description: 'Roof Leak',
                status: 'pending',
            },
        ],
    },
    // Add more dummy data objects as needed
];

export default issuesData;