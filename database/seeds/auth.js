exports.seed = async function(knex) {
	// Deletes ALL existing entries
	await knex('users').del().then(async function() {
		// Inserts seed entries
		return knex('users').insert([
			{ id: 1, username: 'Ramy', password: 'Ramy123' },
			{ id: 2, username: 'Samer', password: 'Samer123' }
		]);
	});
};
