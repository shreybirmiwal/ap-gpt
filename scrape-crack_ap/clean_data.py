import jsonlines

def clean_jsonl(input_file, output_file):
    with jsonlines.open(input_file, 'r') as reader, jsonlines.open(output_file, 'w') as writer:
        for line in reader:
            # Extract the input and output from the JSON line
            input_text = line['input']
            output_text = line['output']
            
            # Remove the leading number and period from the input text
            cleaned_input = input_text.split('.', 1)[-1].strip()
            
            # Create a new dictionary with the cleaned input and output
            cleaned_entry = {'input': cleaned_input, 'output': output_text}
            
            # Write the cleaned entry to the output JSONL file
            writer.write(cleaned_entry)

if __name__ == "__main__":
    input_file = 'out.jsonl'  # Path to your input JSONL file
    output_file = 'cleaned_output.jsonl'  # Path to the output cleaned JSONL file
    
    clean_jsonl(input_file, output_file)
    print(f"Cleaning complete. Cleaned data saved to '{output_file}'.")
