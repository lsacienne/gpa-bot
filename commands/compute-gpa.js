const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('compute-gpa')
		.setDescription('Compute your GPA'),
        /*
        .addStringOption(option =>
            option.setName('grades')
                .setDescription('The input to echo back')
                .setRequired(true)),
        */
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
            .setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
            - Indiquez votre nombre d'UV\n
            Nombre d'UV : **${nombre_uv}**`);

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
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('confirm')
                                .setLabel("Valider")
                                .setStyle('PRIMARY')
                        );

                    const uv_message = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('GPA')
                        .setURL('https://discord.js.org')
                        .setDescription(`Cette application permet de calculer votre GPA. Suivez les instructions ci-dessous :\n
                        - Indiquez le nombre de crédits de l'UV\n
                        - Indiquez la note que vous avez obtenu :\n
                        Nombre de crédits de l'UV : **${credits}**\n
                        Note obtenue à l'UV : ${note}`);

                    const message = await interaction.client.channels.cache.get(interaction.channelId).send({content: `UV ${j+1} :`, embeds: [uv_message], components: [row], ephemeral: true })
                    
                    try {
                        await message.react('1️⃣');
                        await message.react('2️⃣');
                        await message.react('3️⃣');
                        await message.react('4️⃣');
                        await message.react('5️⃣');
                        await message.react('6️⃣');
                        await message.react('🔸');
                        await message.react('🇦');
                        await message.react('🇧');
                        await message.react('🇨');
                        await message.react('🇩');
                        await message.react('🇪');
                        await message.react('🇫');
                    } catch (error) {
                        console.error('One of the emojis failed to react:', error);
                    }
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

        const first_selection = await interaction.reply({ content: string, components: [row], embeds: [embed], ephemeral: true});
	},
};

