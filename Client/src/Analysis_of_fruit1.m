% Load fresh and rotten apple images
freshApple = imread('fresh apple.jpg');
rottenApple = imread('rotten apple.jpg');

% Convert images to grayscale
grayFreshApple = rgb2gray(freshApple);
grayRottenApple = rgb2gray(rottenApple);

% Perform histogram equalization to balance intensity
eqFreshApple = histeq(grayFreshApple);
eqRottenApple = histeq(grayRottenApple);

% Perform median filtering
filteredFreshApple = medfilt2(eqFreshApple, [10 10]);
filteredRottenApple = medfilt2(eqRottenApple, [10 10]);

% Perform sharpening
sharpenedFreshApple = imsharpen(filteredFreshApple, 'Amount', 1.5);
sharpenedRottenApple = imsharpen(filteredRottenApple, 'Amount', 1.5);

% Perform Canny edge detection
cannyFreshApple = edge(sharpenedFreshApple, 'canny');
cannyRottenApple = edge(sharpenedRottenApple, 'canny');

% Ensure both images have the same dimensions
cannyFreshApple = imresize(cannyFreshApple, size(cannyRottenApple));

% Calculate decay percentage for fresh and rotten apples
totalPixelsFresh = numel(cannyFreshApple);
totalPixelsRotten = numel(cannyRottenApple);

decayPercentageFresh = sum(cannyFreshApple(:)) / totalPixelsFresh * 100;
decayPercentageRotten = sum(cannyRottenApple(:)) / totalPixelsRotten * 100;

% Display the results
fprintf('Fresh Apple - Decay Percentage: %.2f%%\n', decayPercentageFresh);
fprintf('Rotten Apple - Decay Percentage: %.2f%%\n', decayPercentageRotten);

% Create a MATLAB structure to store decay percentages
data = struct('freshApplePercentage', decayPercentageFresh, 'rottenApplePercentage', decayPercentageRotten);

% Convert the MATLAB structure into a JSON string
jsonStr = jsonencode(data);

% Write the JSON string to a file
fid = fopen('matlabData.json', 'w');
if fid == -1
    error('Unable to open the JSON file for writing.');
end
fwrite(fid, jsonStr, 'char');
fclose(fid);
