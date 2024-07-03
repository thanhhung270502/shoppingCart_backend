import random


for i in range(500):
    fake_id = "sdhahgihgelbgergi" + str(i)
    fake_name = "Lorem Ipsum is simply dummy " + str(i)
    fake_current_price = (random.randint(200, 500)) * 1000
    fake_previous_price = fake_current_price + 30000
    print("('" + fake_id + "', '1', '" + fake_name + "', '" + str(fake_previous_price) + "', '" + str(fake_current_price) + "', '" + fake_name + "', 'private', '${currentTime}', '${currentTime}'),")
    
# ('sdhahgihgelbgergi1', '1', 'Lorem Ipsum is simply dummy 1', 259000, 239000, 'Lorem Ipsum is simply dummy', 'private', '${currentTime}', '${currentTime}'),