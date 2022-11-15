const btn = document.getElementById('btn') ;
const inpu = document.getElementById('input') ;


function sendURL (URL) {
  let c_ = window.location.href ;
  window.location.href = c_ + 'download?URL='+URL
}


btn.addEventListener('click' , () => {
  console.log(`URL: ${inpu.value}`);
  sendURL(inpu.value);
})
