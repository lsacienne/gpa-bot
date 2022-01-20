const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('compute-gpa')
		.setDescription('Compute your GPA')
        .addStringOption(option =>
            option.setName('grades')
                .setDescription('The input to echo back')
                .setRequired(true)),
	async execute(interaction) {
        let nombre_uv = 0;
        const string = interaction.options.getString('grades');

        // ADD OF SOME BUTTONS ON THE DISCORD MESSAGE
        const primary = new MessageButton()
            .setCustomId('primary')
            .setLabel('Valider')
            .setStyle('PRIMARY');
        const minus_button = new MessageButton()
            .setCustomId('minus')
            .setLabel('-')
            .setStyle('SECONDARY')
            .setDisabled(true);
        const plus_button = new MessageButton()
            .setCustomId('plus')
            .setLabel('+')
            .setStyle('SECONDARY');

        const row = new MessageActionRow()
			.addComponents(
				primary,
                minus_button,
                plus_button
			);

        // A SMALL MESSAGE TO PRESENT THE WAY THE APPLICATION WORKS
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('GPA')
            .setURL('https://discord.js.org')
            .setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n- Indiquez votre nombre d'UV\nNombre d'UV : **${nombre_uv}**`);

        // GESTION OF THE BUTTONS
        const filter = i => i.customId === 'primary' || i.customId === 'plus' || i.customId === 'minus';

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        
        collector.on('collect', async i => {
            if (i.customId === 'primary') {
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('GPA')
                    .setURL('https://discord.js.org')
                    .setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n- Indiquez votre nombre d'UV\nNombre d'UV : **${nombre_uv}**`);
                await i.update({embeds: [embed], components: []});
                
                for(let j = 0; j<nombre_uv;j++) {
                    let note = '';
                    let credits = 0;
                    const credit_row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('credit_1')
                                .setEmoji("1️⃣")
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('credit_2')
                                .setEmoji("2️⃣")
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('credit_3')
                                .setEmoji("3️⃣")
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('credit_4')
                                .setEmoji("4️⃣")
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('credit_5')
                                .setEmoji("5️⃣")
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('credit_6')
                                .setEmoji("6️⃣")
                                .setStyle('SECONDARY')
                            );
                    const grade_row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('grade_A')
                                .setEmoji("🇦")
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('grade_B')
                                .setEmoji("🇧")
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('grade_C')
                                .setEmoji("🇨")
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('grade_D')
                                .setEmoji("🇩")
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('grade_E')
                                .setEmoji("🇪")
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('grade_F')
                                .setEmoji("🇫")
                                .setStyle('SECONDARY')
                            );
                    const uv_message = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('GPA')
                        .setURL('https://discord.js.org')
                        .setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n- Indiquez le nombre de crédits de l'UV\n- Indiquez la note que vous avez obtenu :\nNombre de crédits de l'UV : **${credits}**\nNote obtenue à l'UV : ${note}`);
                    await i.editReply({content: `UV ${j+1} :`, embeds: [uv_message], components: [credit_row, grade_row], ephemeral: true })
                    
                }

















            } else if (i.customId === 'plus'){
                nombre_uv++;
                if(nombre_uv > 0) {
                    minus_button.setDisabled(false);
                }
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('GPA')
                    .setURL('https://discord.js.org')
                    .setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n- Indiquez votre nombre d'UV\nNombre d'UV : **${nombre_uv}**`);
                await i.update({embeds: [embed], components: [row]});
            } else if(i.customId === 'minus'){
                nombre_uv--;
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('GPA')
                    .setURL('https://discord.js.org')
                    .setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n- Indiquez votre nombre d'UV\nNombre d'UV : **${nombre_uv}**`);
                if(nombre_uv <= 0) {
                    minus_button.setDisabled(true);
                }
                await i.update({embeds: [embed], components: [row]});
            }
        });
        
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));

        await interaction.reply({ content: string, components: [row], embeds: [embed], ephemeral: true});
	},
};

