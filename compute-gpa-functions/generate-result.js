const { MessageEmbed } = require('discord.js');

module.exports = {
    async generateResult(list_results, interaction) {
        let gpa = 0;
        let coefficientSum = 0;
        let resultMap = this.initializeResultMap();

        for(res of list_results) {
            gpa += res[0] * resultMap.get(res[1]);
            coefficientSum += res[0];
        }
        gpa /= coefficientSum;

        resultMessage = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('GPA')
            .setURL('https://discord.js.org')
            .setDescription(`Votre GPA :\n
            \t\t${gpa}`
        );

        await interaction.followUp({embeds: [resultMessage], components: [], ephemeral: true});
        
    },

    /**
     * Method to create a map of results to match mark with their respective score in gpa algebric expression.
     * @returns the map of results freshly created
     */
    initializeResultMap() {
        let map = new Map();

        map.set('A',100);
        map.set('B',80);
        map.set('C',60);
        map.set('D',40);
        map.set('E',20);
        map.set('F',0);

        return map;
    }
}