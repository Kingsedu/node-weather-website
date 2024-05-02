document.addEventListener('DOMContentLoaded', ()=>{

    const formInput = document.querySelector('form #form-id');
    const submitButton = document.querySelector('button[type="submit"]');
    const errorText= document.querySelector('.error-one');
    const errorLoading= document.querySelector('.error-two');
    const loadingError = document.querySelector('.error');


   
            
    submitButton.addEventListener('click', (e)=>{
        e.preventDefault();
    
        const location = formInput.value;

        if (!location) {
            loadingError.textContent = 'Please enter a location';

            setTimeout(()=>{
                loadingError.textContent= ''
            },2000)
            return
        }
        errorText.textContent= ''
        fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        if(!response){
            throw new Error('Invalid response from server')
    
        }
        response.json().then((data)=>{
            if(!data){
                errorText.textContent= data.error;
                errorText.textContent = ''
                console.log(data.error)
            }else{
                const { temp, humidity, pressure, des } = data.forecast;
                const { latitude, longitude, location } = data.location 
                errorLoading.textContent =`the temperation of ${location} is ${temp}, the prssure in the area is ${pressure}, humidity is ${humidity} and the cloud is ${des}`;
                errorText.textContent = `the area location :${location} is located on ${latitude} latitude and ${longitude} longitude`;

                // setTimeout(()=>{
                //     errorLoading.textContent = '';
                //     errorText.textContent = '';
                // }, 15000)

                formInput.value = ''
                console.log(data.forecast);
                console.log(data.location);
            }
        })
    })
    
    })
    
})








// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//         response.json().then((data)=>{
//             console.log(data)
//         })
// })