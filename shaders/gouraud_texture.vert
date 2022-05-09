#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;
in vec2 vertex_texcoord;

uniform vec3 light_ambient;
struct LightPoint {
    vec3 light_color;
    vec3 light_position;
};
uniform LightPoint lights[10];
uniform vec3 camera_position;
uniform float material_shininess;
uniform vec2 texture_scale;
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;
out vec2 frag_texcoord;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
    frag_texcoord = vertex_texcoord * texture_scale;

    vec3 position = vec3(model_matrix * vec4(vertex_position, 1.0));
	vec3 newVertexNormal = normalize(inverse(transpose(mat3(model_matrix))) * vertex_normal);
	
	for(int i = 0; i < 10; i++) {
		
		vec3 directionOfLight = normalize(lights[i].light_position - position);
		diffuse = diffuse + clamp(lights[i].light_color * dot(newVertexNormal, directionOfLight), 0.0, 1.0);

		vec3 view_direction = normalize(camera_position - position); 
		vec3 reflected_direction = normalize(reflect(-directionOfLight, newVertexNormal));
		specular = specular + lights[i].light_color * pow(clamp(dot(reflected_direction, view_direction), 0.0, 1.0), material_shininess);
	}
	ambient = light_ambient;
}
