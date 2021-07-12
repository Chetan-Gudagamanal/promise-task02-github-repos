
let submit=document.querySelector(".submit-btn")
submit.addEventListener("click", (event)=>{
    
    if(document.querySelector(".accordion")){
        document.querySelector(".accordion").remove()
    }

    
    let accordion= document.createElement("div")
    accordion.setAttribute("class","accordion accordion-flush")
    accordion.setAttribute("id","accordionFlushExample")

    let repoListDiv=document.querySelector(".repoListDiv")
    repoListDiv.append(accordion)

    let repoFunction = async()=>{
        try{
            let userName=document.querySelector(".userName").value

            let url=`https://api.github.com/users/${userName}/repos`
            let repos=fetch(url);
            let repoListRaw=await repos;
            let repoList=await repoListRaw.json();

            let unitMap=[{1:"One"},{2:"two"},{3:"Three"},{4:"Four"},{5:"Five"},{6:"Six"},{7:"Seven"},{8:"Eight"},{9:"Nine"}]
            let tensDigitMap=[{10:"Ten"},{11:"Eleven"},{12:"Twelve"},{13:"Thirteen"},{14:"Fourteen"},{15:"fifteen"},{16:"Sixteen"},{17:"Seventeen"},{18:"Eighteen"},{19:"Ninteen"}]
            let twoDigitMap=[{20:"Twenty"},{30:"Thirty"},{40:"Fourty"},{50:"Fifty"},{60:"Sixty"},{70:"Seventy"},{80:"Eighty"},{90:"Ninty"}]
            
            for (i in repoList){
                
                let repoName=repoList[i].name;
                let oneIndex=+i+1
                
                let indexStrArr;
                if(String(oneIndex).length===1){
                    indexStrArr=unitMap.filter(ele=>ele[oneIndex])
                }
                else if(String(oneIndex).length===2){
                    if(String(oneIndex)[0]==1){
                        indexStrArr=tensDigitMap.filter(ele=>ele[oneIndex])
                    }
                    else{
                        let str1=twoDigitMap.filter(ele=>ele[(Math.floor(oneIndex/10))*10])
                        if(String(oneIndex)[1]==0){
                            indexStrArr=str1;
                        } else{
                            let str2=unitMap.filter(ele=>ele[oneIndex%10])
                            let tempArr=[]
                            let tempObj={}
                            tempObj[oneIndex]=str1[0][(Math.floor(oneIndex/10))*10]+str2[0][(oneIndex%10)]
                            
                            tempArr.push(tempObj);
                            indexStrArr=tempArr
                        }
                    }
                }
                
                
                
                let accordion_item=document.createElement("div");
                let h2=document.createElement("h2");
                let button=document.createElement("button")

                accordion_item.setAttribute("class","accordion-item")
                h2.setAttribute("class","accordion-header")
                h2.setAttribute("id","flush-headingOne")
                button.setAttribute("class","accordion-button collapsed")
                button.setAttribute("type","button")
                button.setAttribute("data-bs-toggle","collapse")
                button.setAttribute("data-bs-target",`#flush-collapse${indexStrArr[0][oneIndex]}`)
                button.setAttribute("aria-expanded","false")
                button.setAttribute("aria-controls","flush-collapseOne")
                button.innerHTML=repoName
                // <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                // <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                accordion_body=document.createElement("div")
                accordion_collapse=document.createElement("div")

                accordion_body.setAttribute("class","accordion-body")
                // accordion_body.innerHTML="Placeholder content for this accordion"
                let created_var=repoList[i].created_at.split("T")
                let updated_var=repoList[i].updated_at.split("T")
                accordion_body.innerHTML=`<div style="font-size:0.7em">
                    
                    <p>Created At  :  ${created_var[0]},  ${created_var[1]}</p>

                    <p>Updated At  :  ${updated_var[0]},  ${updated_var[1]}</p>
                    <p>Clone URL  :  ${repoList[i].clone_url}</p>
                </div>`


                accordion_collapse.setAttribute("id",`flush-collapse${indexStrArr[0][oneIndex]}`)
                accordion_collapse.setAttribute("class","accordion-collapse collapse")
                accordion_collapse.setAttribute("aria-labelledby",`flush-heading${indexStrArr[0][oneIndex]}`)
                accordion_collapse.setAttribute("data-bs-parent","#accordionFlushExample")

                

                h2.append(button)
                accordion_item.append(h2)
                accordion.append(accordion_item)
                accordion_collapse.append(accordion_body)
                accordion_item.append(accordion_collapse)

            } 
        }catch{
            alert("Please Ensure GitHub username is correct and has atleast one repository / This app can list upto 100 repos, if not, kindly try after sometime")
        }
    }
    repoFunction();
    event.preventDefault();
    
})



