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

                let list_results = [];
                let list_widgets = [];
                let list_uv_messages = [];
                for(let j = 0; j<nombre_uv;++j) {
                    list_results.push([0,' ']);
                }

                require("../compute-gpa-functions/uv_collector").generateUvCollector(interaction,nombre_uv,0,list_results, list_widgets, list_uv_messages);

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

