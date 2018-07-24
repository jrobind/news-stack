export default (type, value) => {
    if (type === 'UV' && value < 2.9 || type === 'Pollution' && value <= 50) {
        return {
            color: 'rgba(63, 219, 63, 0.8)',
            text: type === 'UV' ? 'Low' : 'Excellent' 
        }
    } else if (type === 'UV' && value > 2.9 && value <= 5.9 || type === 'Pollution' && value > 50 && value <= 100) {
        return {
            color: 'rgba(255, 191, 0, 0.8)',
            text: type === 'UV' ? 'Moderate' : 'Good' 
        }
    } else if (type === 'UV' && value > 5.9 && value <= 7.9 || type === 'Pollution' && value > 100 && value <= 150) {
        return {
            color: 'rgba(233, 105, 44, 0.8)',
            text: 'High'  
        }
    } else if (type === 'UV' && value > 7.9 && value <= 10.9 || type === 'Pollution' && value > 150 && value <= 200) {
        return {
            color: 'rgba(229, 0, 0, 0.8)',
            text: 'Very high'  
        }
    } else if (type === 'UV' && value > 10.9 || type === 'Pollution' && value > 200) {
        return {
            color: 'rgba(153, 0, 0, 0.8)',
            text: 'Extreme'  
        }
    }
}