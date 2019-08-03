const template = kendo.template(`
 Full name: <span> #= lastName #<span>
 <span> #= firstName #<span>
`);

const data = {
    lastName: 'veda',
    firstName: 'sameer'
};

const result = template(data);

document.getElementById('chart').innerHTML = result;



