const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    async generateUvCollector(interaction, nombre_uv, current_index, list_results,list_widgets,list_uv_messages) {

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

        const filter = i => 
            i.customId === 'confirm' || i.customId === '1' || i.customId === '2' ||
            i.customId === '3' || i.customId === '4' || i.customId === '5' ||
            i.customId === '6' || i.customId === 'A' || i.customId === 'B' ||
            i.customId === 'C' || i.customId === 'D' || i.customId === 'E' ||
            i.customId === 'F';

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            switch(i.customId){
                case 'confirm':
                    i.update({embeds: [list_uv_messages[current_index]],components: []});
                    this.generateUvCollector(interaction,nombre_uv-1,current_index+1,list_results,list_widgets,list_uv_messages);
                    break;
                case '1':
                    list_results[current_index][0] = 1;
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case '2':
                    list_results[current_index][0] = 2;
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case '3':
                    list_results[current_index][0] = 3;
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case '4':
                    list_results[current_index][0] = 4;
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case '5':
                    list_results[current_index][0] = 5;
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case '6':
                    list_results[current_index][0] = 6;
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case 'A':
                    list_results[current_index][1] ='A';
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case 'B':
                    list_results[current_index][1] ='B';
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case 'C':
                    list_results[current_index][1] ='C';
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case 'D':
                    list_results[current_index][1] ='D';
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case 'E':
                    list_results[current_index][1] ='E';
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                case 'F':
                    list_results[current_index][1] ='F';
                    list_uv_messages[current_index].setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${list_results[current_index][0]}**\n
                        Note obtenue à l'UV : **${list_results[current_index][1]}**`);
                    i.update({embeds: [list_uv_messages[current_index]],components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true});
                    break;
                defautlt:
                    break;
            }
                
        });                  
        list_widgets.push(uv_selection = await interaction.followUp({embeds: [list_uv_messages[current_index]], components: [row1,row_credits1,row_credits2,row_grade1,row_grade2], ephemeral: true}));

    }
}