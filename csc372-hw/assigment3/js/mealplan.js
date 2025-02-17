/**
 * Meal Plan functionality for Campus Culinary Delights.
 * Allows users to add recommended dishes to a meal plan, update dish quantities,
 * and display the total cost. Users can click on a dish from the selection list to add it.
 */
document.addEventListener('DOMContentLoaded', () => {
    let dishList = document.getElementById('dish-list');
    let mealPlanList = document.getElementById('meal-plan-list');
    let totalCostElement = document.getElementById('cost-amount');

    // Meal plan data structure: keys are dish names, values are objects with count and cost
    let mealPlan = {};

    /**
     * Updates the meal plan display, including the list of dishes and the total cost.
     */
    function updateMealPlanDisplay() {
        // Clear the meal plan list
        mealPlanList.innerHTML = '';
        let totalCost = 0;

        // Iterate through each dish in the meal plan
        for (let dish in mealPlan) {
            let dishData = mealPlan[dish];
            totalCost += dishData.count * dishData.cost;

            let li = document.createElement('li');
            li.textContent = `${dish} (x${dishData.count}) - $${(dishData.count * dishData.cost).toFixed(2)}`;

            // Create button group for incrementing or decrementing the order
            let buttonGroup = document.createElement('div');
            buttonGroup.classList.add('button-group');

            // Add button
            let addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.addEventListener('click', () => {
                mealPlan[dish].count++;
                updateMealPlanDisplay();
            });

            // Remove button
            let removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.addEventListener('click', () => {
                mealPlan[dish].count--;
                if (mealPlan[dish].count <= 0) {
                    delete mealPlan[dish];
                }
                updateMealPlanDisplay();
            });

            buttonGroup.appendChild(addButton);
            buttonGroup.appendChild(removeButton);
            li.appendChild(buttonGroup);

            mealPlanList.appendChild(li);
        }

        totalCostElement.textContent = totalCost.toFixed(2);
    }

    // Attach an event listener to each dish in the dish selection list
    dishList.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            let dishName = item.getAttribute('data-dish');
            let dishCost = parseFloat(item.getAttribute('data-cost'));

            if (mealPlan[dishName]) {
                mealPlan[dishName].count++;
            } else {
                mealPlan[dishName] = {
                    count: 1,
                    cost: dishCost
                };
            }
            updateMealPlanDisplay();
        });
    });
});