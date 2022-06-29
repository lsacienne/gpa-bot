const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    /**
     * Recursive function to generate widgets with button collector
     * @param {*} interaction 
     * @param {int} uv_number - integer representing th number of UV
     * @param {int} current_index - integer representing the current index 
     * @param {list<list>} list_results - list of of lists. each list contained has this form : [creditNumber,markObtained]
     * @param {list} list_uv_messages - list of uv messages
     */
    async generateUvCollector(interaction, uv_number, current_index, list_results,list_uv_messages) {

        if (uv_number == 0) {
            require("./generate-result").generateResult(list_results,interaction);
        } else {
            const row1 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('confirm')
                        .setLabel("Valider")
                        .setStyle('PRIMARY'),          
                );
            const row_grade1 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('F')
                        .setStyle('SECONDARY')
                        .setEmoji('🇫'),
                    new MessageButton()
                        .setCustomId('E')
                        .setStyle('SECONDARY')
                        .setEmoji('🇪'),
                    new MessageButton()
                        .setCustomId('D')
                        .setStyle('SECONDARY')
                        .setEmoji('🇩'),
                    new MessageButton()
                        .setCustomId('C')
                        .setStyle('SECONDARY')
                        .setEmoji('🇨'),
                    new MessageButton()
                        .setCustomId('B')
                        .setStyle('SECONDARY')
                        .setEmoji('🇧'),
                    
                );
            const row_grade2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('A')
                        .setStyle('SECONDARY')
                        .setEmoji('🇦')
                );
            
                const row_credits1 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('1')
                        .setStyle('SECONDARY')
                        .setEmoji('1️⃣'),
                    new MessageButton()
                        .setCustomId('2')
                        .setStyle('SECONDARY')
                        .setEmoji('2️⃣'),
                    new MessageButton()
                        .setCustomId('3')
                        .setStyle('SECONDARY')
                        .setEmoji('3️⃣'),
                    new MessageButton()
                        .setCustomId('4')
                        .setStyle('SECONDARY')
                        .setEmoji('4️⃣'),
                        new MessageButton()
                        .setCustomId('5')
                        .setStyle('SECONDARY')
                        .setEmoji('5️⃣'),  
                );
                const row_credits2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('6')
                        .setStyle('SECONDARY')
                        .setEmoji('6️⃣'),
                );
    
            list_uv_messages.push(new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('GPA')
                .setURL('https://discord.js.org')
                .setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                - Indiquez le nombre de crédits de l'UV\n
                - Indiquez la note que vous avez obtenu :\n
                Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                Note obtenue à l'UV : ${list_results[current_index][1]}`));
    
                await interaction.followUp(
                    {embeds: [list_uv_messages[current_index]],
                     components: [row1,row_credits1,row_credits2,row_grade1,row_grade2],
                     ephemeral: true})
                .then(msg => { 

                    const filter = i => 
                        i.customId === 'confirm' || i.customId === '1' || i.customId === '2' ||
                        i.customId === '3' || i.customId === '4' || i.customId === '5' ||
                        i.customId === '6' || i.customId === 'A' || i.customId === 'B' ||
                        i.customId === 'C' || i.customId === 'D' || i.customId === 'E' ||
                        i.customId === 'F';
            
                    let collector = msg.channel.createMessageComponentCollector({ filter, time: 15000 });
            
                    collector.on('collect', async i => {
                        console.log(current_index);
                        switch(i.customId){
                            case 'confirm':    
                                collector.stop();
                                await i.update({embeds: [list_uv_messages[current_index]],components: []});
                                return await this.generateUvCollector(interaction,uv_number-1,current_index+1,list_results,list_uv_messages);
                            case '1':
                                list_results[current_index][0] = 1;
                                break;
                            case '2':
                                list_results[current_index][0] = 2;
                                break;
                            case '3':
                                list_results[current_index][0] = 3;
                                break;
                            case '4':
                                list_results[current_index][0] = 4;
                                break;
                            case '5':
                                list_results[current_index][0] = 5;
                                break;
                            case '6':
                                list_results[current_index][0] = 6;
                                break;
                            case 'A':
                                list_results[current_index][1] ='A';
                                break;
                            case 'B':
                                list_results[current_index][1] ='B';
                                break;
                            case 'C':
                                list_results[current_index][1] ='C';
                                break;
                            case 'D':
                                list_results[current_index][1] ='D';
                                break;
                            case 'E':
                                list_results[current_index][1] ='E';
                                break;
                            case 'F':
                                list_results[current_index][1] ='F';
                                break;
                            default:
                                break;
                        }
                        list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                                    - Indiquez le nombre de crédits de l'UV\n
                                    - Indiquez la note que vous avez obtenu :\n
                                    Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                                    Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                        return await i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                            
                    });
                });
            
        }


    }
}