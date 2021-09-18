<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Form1
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.components = New System.ComponentModel.Container()
        Me.keylog_txt = New System.Windows.Forms.RichTextBox()
        Me.Timer1 = New System.Windows.Forms.Timer(Me.components)
        Me.Timer2 = New System.Windows.Forms.Timer(Me.components)
        Me.Timer3 = New System.Windows.Forms.Timer(Me.components)
        Me.PictureBox1 = New System.Windows.Forms.PictureBox()
        Me.Timer4 = New System.Windows.Forms.Timer(Me.components)
        Me.Timer5 = New System.Windows.Forms.Timer(Me.components)
        Me.Timer_checkSandBox = New System.Windows.Forms.Timer(Me.components)
        Me.config_txt = New System.Windows.Forms.TextBox()
        Me.Timer6 = New System.Windows.Forms.Timer(Me.components)
        Me.txt_tasks = New System.Windows.Forms.TextBox()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'keylog_txt
        '
        Me.keylog_txt.Location = New System.Drawing.Point(12, 40)
        Me.keylog_txt.Name = "keylog_txt"
        Me.keylog_txt.Size = New System.Drawing.Size(326, 201)
        Me.keylog_txt.TabIndex = 0
        Me.keylog_txt.Text = ""
        '
        'Timer1
        '
        '
        'Timer2
        '
        '
        'Timer3
        '
        Me.Timer3.Interval = 63000
        '
        'PictureBox1
        '
        Me.PictureBox1.Location = New System.Drawing.Point(370, 40)
        Me.PictureBox1.Name = "PictureBox1"
        Me.PictureBox1.Size = New System.Drawing.Size(294, 201)
        Me.PictureBox1.TabIndex = 1
        Me.PictureBox1.TabStop = False
        '
        'Timer4
        '
        Me.Timer4.Interval = 62000
        '
        'Timer5
        '
        '
        'Timer_checkSandBox
        '
        Me.Timer_checkSandBox.Interval = 5000
        '
        'config_txt
        '
        Me.config_txt.Location = New System.Drawing.Point(12, 271)
        Me.config_txt.Multiline = True
        Me.config_txt.Name = "config_txt"
        Me.config_txt.Size = New System.Drawing.Size(519, 32)
        Me.config_txt.TabIndex = 2
        '
        'Timer6
        '
        Me.Timer6.Interval = 55000
        '
        'txt_tasks
        '
        Me.txt_tasks.Location = New System.Drawing.Point(12, 355)
        Me.txt_tasks.Multiline = True
        Me.txt_tasks.Name = "txt_tasks"
        Me.txt_tasks.Size = New System.Drawing.Size(394, 37)
        Me.txt_tasks.TabIndex = 3
        '
        'Form1
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(693, 404)
        Me.Controls.Add(Me.txt_tasks)
        Me.Controls.Add(Me.config_txt)
        Me.Controls.Add(Me.PictureBox1)
        Me.Controls.Add(Me.keylog_txt)
        Me.Name = "Form1"
        Me.Text = "Form1"
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub
    Friend WithEvents keylog_txt As System.Windows.Forms.RichTextBox
    Friend WithEvents Timer1 As System.Windows.Forms.Timer
    Friend WithEvents Timer2 As System.Windows.Forms.Timer
    Friend WithEvents Timer3 As System.Windows.Forms.Timer
    Friend WithEvents PictureBox1 As System.Windows.Forms.PictureBox
    Friend WithEvents Timer4 As System.Windows.Forms.Timer
    Friend WithEvents Timer5 As System.Windows.Forms.Timer
    Friend WithEvents Timer_checkSandBox As System.Windows.Forms.Timer
    Friend WithEvents config_txt As System.Windows.Forms.TextBox
    Friend WithEvents Timer6 As System.Windows.Forms.Timer
    Friend WithEvents txt_tasks As System.Windows.Forms.TextBox

End Class
