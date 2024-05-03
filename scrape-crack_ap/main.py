import requests
from bs4 import BeautifulSoup

base_url = "https://www.crackap.com/ap/chemistry/question-{0}-answer-and-explanation.html"

# Iterate over the range of question numbers (1 to 555)
for question_number in range(1, 556):
    url = base_url.format(question_number)
    
    try:
        response = requests.get(url)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')            
            print(soup.prettify())
            

            
    except requests.exceptions.RequestException as e:
        print(f"Error fetching question {question_number}: {e}")
        



# each page starts with something like:
#          <strong>
#           Question: 75
#          </strong>
