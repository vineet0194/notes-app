const { Router } = require('express');
const z = require('zod');
const router = Router();
const { UserModel, NoteModel, ZodNoteSchema } = require('../db/index')
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, async (req, res)=>{
    const userId = req.user.sub;

    try{
        const notes = await NoteModel.find({
            author: userId
        });

        return res.json({
            notes
        });

    } catch(error){
        return res.status(500).json({
            message: "Some error occured, pls try again."
        });
    }
});

router.get('/:noteId', authMiddleware, async (req, res)=>{
    const { noteId } = req.params;

    try{
        const note = await NoteModel.findById(noteId);
        if (!note){
            return res.status(404).json({
                message: "Note not found."
            });
        }

        if (note.author.toString() === req.user.sub){   
            return res.json({
                note
            });
        }

        return res.status(403).json({
            message: "That's not your note."
        })

    } catch(error){
        return res.status(500).json({
            message: "Some error occured, pls try again."
        });
    }
});

router.post('/', authMiddleware, async (req, res)=>{
    const userId = req.user.sub;
    
    try{
        const { title, content } = req.body;

        const payload = {
            title,
            content
        }

        const result = ZodNoteSchema.safeParse(payload);
        if (!result.success){
            const fieldErrors = result.error.flatten().fieldErrors;
            return res.status(400).json({
                fieldErrors
            });
        }

        const note = await NoteModel.create({
            title,
            content,
            author: userId
        });
        return res.status(201).json({
            message: "Note created succesfully!",
            note
        })
    } catch(error){
        return res.status(500).json({
            error: error.message,
            message: "Some error occured, pls try again."
        });
    }
});

router.delete('/:noteId', authMiddleware, async (req, res)=>{
    const { noteId } = req.params;
    try{
        const noteExists = await NoteModel.findById(noteId);
        if (noteExists){
            if (noteExists.author.toString() === req.user.sub){
                await NoteModel.findByIdAndDelete(noteId);
                return res.json({
                    message: "Note deleted!"
                })
            }
            else{
                return res.status(403).json({
                    message: "You are not authorised to delete this note"
                })
            }
        }
        else{
            return res.status(404).json({
                message: "Note not found."
            });
        }
    } catch(error){
        return res.status(500).json({
            message: "Some error occured, pls try again."
        });
    }
});

module.exports = router;