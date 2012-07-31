require 'sinatra'
require './app/models/contact'
require 'json_builder'

get '/' do
	redirect 'index.html'
end

def contact_json(contacts) 
	JSONBuilder::Compiler.generate do
		array Array(contacts) do |contact|
			id contact[:id]
			fullName contact[:full_name]
			nickName contact[:nick_name]
			profession contact[:profession]
			birthDate contact[:birth_date]
			gender contact[:gender]
			maritalStatus contact[:marital_status].to_s
			residentialPhone contact[:residential_phone]
			fax contact[:fax]
			mobilePhone contact[:mobile_phone]
			postalCode contact[:postal_code]
			city contact[:city]
			publicParkType contact[:public_park_type]
			publicPark contact[:public_park]
			addressNumber contact[:address_number]
			addressComplement contact[:address_complement]
			neighborhood contact[:neighborhood]
		end
	end
end

get '/contacts' do
	contact_json(Contact.all)
end

get '/contacts/:id' do
	contact_json(Contact.get(params[:id]))
end

get '/ceptest' do
	'{"resultado":"1","resultado_txt":"sucesso - cep completo","uf":"PI","cidade":"Teresina","bairro":"Monte Castelo","tipo_logradouro":"Rua","logradouro":"Her\u00e1clito de Sousa"}'
end
