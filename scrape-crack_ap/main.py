import requests
from bs4 import BeautifulSoup
import json

base_url = "https://www.crackap.com/ap/environmental-science/question-{0}-answer-and-explanation.html"

questions_data = []

for question_number in range(1, 661):
    url = base_url.format(question_number)
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            
            question_content = soup.find(class_="mcontent")
            question_text = question_content.find_all('p')[1].get_text(strip=True)
            
            #options
            options = [li.get_text(strip=True) for li in question_content.find(class_="qlist").find_all('li')]
            options_str = ' '.join(options)
            
            #correct answer
            correct_answer = question_content.find('strong', text='Correct Answer:').next_sibling.strip()
            explanation = question_content.find('strong', text='Explanation:').find_next('p').get_text(strip=True)
            
            question_with_options = f"{question_text} {options_str}"
            answer_with_explanation = f"Correct Answer: {correct_answer} Explanation: {explanation}"
            

            question_data = {
                "input": question_with_options,
                "output": answer_with_explanation
            }
            
            questions_data.append(question_data)
            
    except requests.exceptions.RequestException as e:
        print(f"Error fetching question {question_number}: {e}")

#to jsonl
with open("out.jsonl", "w", encoding="utf-8") as jsonl_file:
    for question in questions_data:
        json.dump(question, jsonl_file)
        jsonl_file.write('\n')
