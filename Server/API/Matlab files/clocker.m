format shortg;
y = 0;
while y == 0
    % c = [year month day hour minute seconds]
    c = clock;
    % Rounding every value to an integer
    c = fix(c);
    x.clock = c;
    % accessing the 4th column of c, i.e hours
    x.hours = c(:, 4);
    % accessing the 5th column of c, i.e minutes
    x.minutes = c(:, 5);
    % accessing the 6th column of c, i.e seconds
    x.seconds = c(:, 6);
    
    % Convert x into JSON
    json = jsonencode(x);
    
    % Open the JSON file for writing
    fid = fopen('D:\python projects\SIH-project-local\Client\src\matlabData.json', 'w');
    if fid == -1
        error('Unable to open the JSON file for writing.');
    end
    
    % Write the JSON data to the file
    fwrite(fid, json, 'char');
    pause(5);
    
    % Close the file
    fclose(fid);
end
