import { createMatrixRotation } from "../utils/matrix.js"
import { GL } from "../utils/renderContext.js";

export default class Rect 
{
    constructor(shader) 
    {
        this.shader = shader;
        this.vertexArray = this.createVertexArray();
        this.modelViewLocation = GL.getUniformLocation(this.shader, "modelView");
    }

    setPosition(position_x, position_y, position_z) 
    {
        this.position = { x : position_x, y : position_y, z : position_z };
    }

    setScale(scale_x, scale_y, scale_z) 
    {
        this.scale = { x : scale_x, y : scale_y, z : scale_z };
    }

    free() 
    {
        GL.delteVertexArray(this.vertexArray);
    }

    draw(matrix) 
    {
        GL.useProgram(this.shader);

        if (matrix != undefined) 
        {
            GL.uniformMatrix4fv(
                this.modelViewLocation, 
                false, 
                matrix
            );
        }

        GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0);
    }

    setModelView(matrix) 
    {
        GL.useProgram(this.shader);

        GL.uniformMatrix4fv(
            this.modelViewLocation, 
            false, 
            matrix
        );
    }

    createVertexArray() 
    {	
        const indecies = new Uint16Array([
            0, 1, 3,
            3, 2, 1,
        ]);


        const position = new Float32Array([
            -1, -1, 0,
             1, -1, 0,
             1,  1, 0,
            -1,  1, 0,
        ]);

        const texcoords = new Float32Array([
            0,  1,
            1,  1,
            1,  0,
            0,  0,
        ]);
        
        let id = GL.createVertexArray();
        GL.bindVertexArray(id);

        let indexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, indecies,  GL.STATIC_DRAW);

        GL.enableVertexAttribArray(0);
        
        let positionBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, positionBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, position, GL.STATIC_DRAW);
        GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
        
        GL.enableVertexAttribArray(1);
        
        let texcoordBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, texcoordBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, texcoords,  GL.STATIC_DRAW);
        GL.vertexAttribPointer(1, 2,  GL.FLOAT, false, 0, 0);

        return id;
    }
}